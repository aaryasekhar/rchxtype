const OpenAI = require('openai');
const User = require('../models/User');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class PersonalityService {
  /**
   * Analyze user inputs and update personality profile
   * @param {string} userId - User ID
   * @param {Array} responses - User responses to questions
   * @param {Object} externalData - External integration data
   * @returns {Object} Analysis result with profile and insights
   */
  static async analyzeUserInputs(userId, responses, externalData = {}) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Save user responses
      user.responses.push(...responses);
      await user.save();

      // Prepare data for AI analysis
      const analysisData = await this.prepareAnalysisData(user, externalData);

      // Analyze with AI
      const aiAnalysis = await this.performAIAnalysis(analysisData);

      // Update personality profile
      const updatedProfile = await this.updateProfileFromAnalysis(user, aiAnalysis);

      // Generate insights
      const insights = await this.generateInsights(user);

      // Calculate completion percentage
      const completionPercentage = this.calculateCompletionPercentage(user);

      // Get next questions
      const nextQuestions = await this.getNextQuestions(user);

      return {
        profile: updatedProfile,
        insights,
        completionPercentage,
        nextQuestions
      };
    } catch (error) {
      console.error('Personality analysis error:', error);
      throw error;
    }
  }

  /**
   * Prepare data for AI analysis
   * @param {Object} user - User object
   * @param {Object} externalData - External integration data
   * @returns {Object} Prepared analysis data
   */
  static async prepareAnalysisData(user, externalData) {
    const data = {
      userInfo: {
        age: user.age,
        location: user.location,
        bio: user.bio
      },
      responses: user.responses.map(r => ({
        question: r.question,
        answer: r.answer,
        category: r.category,
        answeredAt: r.answeredAt
      })),
      externalData: {}
    };

    // Add Spotify data
    if (user.integrations.spotify.connected && user.integrations.spotify.listeningData) {
      data.externalData.spotify = {
        topTracks: user.integrations.spotify.listeningData.topTracks,
        topArtists: user.integrations.spotify.listeningData.topArtists,
        playlists: user.integrations.spotify.listeningData.playlists
      };
    }

    // Add YouTube data
    if (user.integrations.youtube.connected && user.integrations.youtube.viewingData) {
      data.externalData.youtube = {
        watchHistory: user.integrations.youtube.viewingData.watchHistory,
        subscriptions: user.integrations.youtube.viewingData.subscriptions,
        playlists: user.integrations.youtube.viewingData.playlists
      };
    }

    // Add LinkedIn data
    if (user.integrations.linkedin.connected && user.integrations.linkedin.professionalData) {
      data.externalData.linkedin = {
        experience: user.integrations.linkedin.professionalData.experience,
        education: user.integrations.linkedin.professionalData.education,
        skills: user.integrations.linkedin.professionalData.skills
      };
    }

    // Add Meta data
    if (user.integrations.meta.connected && user.integrations.meta.socialData) {
      data.externalData.meta = {
        posts: user.integrations.meta.socialData.posts,
        interests: user.integrations.meta.socialData.interests,
        groups: user.integrations.meta.socialData.groups
      };
    }

    return data;
  }

  /**
   * Perform AI analysis using OpenAI
   * @param {Object} analysisData - Prepared analysis data
   * @returns {Object} AI analysis results
   */
  static async performAIAnalysis(analysisData) {
    try {
      const prompt = this.buildAnalysisPrompt(analysisData);

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert personality psychologist analyzing user data to create detailed personality profiles. 
            Analyze the provided data and return a JSON response with the following structure:
            {
              "bigFiveTraits": {
                "openness": {"score": 0-100, "confidence": 0-100, "reasoning": "explanation"},
                "conscientiousness": {"score": 0-100, "confidence": 0-100, "reasoning": "explanation"},
                "extraversion": {"score": 0-100, "confidence": 0-100, "reasoning": "explanation"},
                "agreeableness": {"score": 0-100, "confidence": 0-100, "reasoning": "explanation"},
                "neuroticism": {"score": 0-100, "confidence": 0-100, "reasoning": "explanation"}
              },
              "interests": [
                {"category": "string", "tags": ["string"], "confidence": 0-100, "reasoning": "explanation"}
              ],
              "communicationStyle": {
                "primary": "analytical|expressive|amiable|driver",
                "secondary": "analytical|expressive|amiable|driver",
                "confidence": 0-100,
                "reasoning": "explanation"
              },
              "decisionMaking": {
                "style": "rational|intuitive|dependent|avoidant",
                "confidence": 0-100,
                "reasoning": "explanation"
              },
              "workStyle": {
                "collaboration": 0-100,
                "autonomy": 0-100,
                "structure": 0-100,
                "innovation": 0-100,
                "reasoning": "explanation"
              },
              "socialPreferences": {
                "groupSize": "small|medium|large|mixed",
                "interactionStyle": "introverted|ambiverted|extroverted",
                "leadershipTendency": "follower|collaborator|leader",
                "reasoning": "explanation"
              },
              "insights": [
                {"type": "strength|preference|tendency", "title": "string", "description": "string", "confidence": 0-100}
              ]
            }`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const response = completion.choices[0].message.content;
      return JSON.parse(response);
    } catch (error) {
      console.error('AI analysis error:', error);
      throw new Error('Failed to perform AI analysis');
    }
  }

  /**
   * Build analysis prompt for AI
   * @param {Object} analysisData - Analysis data
   * @returns {string} Formatted prompt
   */
  static buildAnalysisPrompt(analysisData) {
    let prompt = `Analyze the following user data to create a comprehensive personality profile:

User Information:
- Age: ${analysisData.userInfo.age || 'Unknown'}
- Location: ${analysisData.userInfo.location || 'Unknown'}
- Bio: ${analysisData.userInfo.bio || 'None provided'}

User Responses:`;

    analysisData.responses.forEach((response, index) => {
      prompt += `\n${index + 1}. Question: ${response.question}\n   Answer: ${response.answer}\n   Category: ${response.category}`;
    });

    if (Object.keys(analysisData.externalData).length > 0) {
      prompt += '\n\nExternal Data:';
      
      if (analysisData.externalData.spotify) {
        prompt += '\n\nSpotify Listening Data:';
        if (analysisData.externalData.spotify.topTracks.length > 0) {
          prompt += '\nTop Tracks:';
          analysisData.externalData.spotify.topTracks.slice(0, 5).forEach(track => {
            prompt += `\n- ${track.name} by ${track.artist}`;
          });
        }
        if (analysisData.externalData.spotify.topArtists.length > 0) {
          prompt += '\nTop Artists:';
          analysisData.externalData.spotify.topArtists.slice(0, 5).forEach(artist => {
            prompt += `\n- ${artist.name} (${artist.genres.join(', ')})`;
          });
        }
      }

      if (analysisData.externalData.youtube) {
        prompt += '\n\nYouTube Viewing Data:';
        if (analysisData.externalData.youtube.watchHistory.length > 0) {
          prompt += '\nRecent Videos:';
          analysisData.externalData.youtube.watchHistory.slice(0, 5).forEach(video => {
            prompt += `\n- ${video.title} (${video.category})`;
          });
        }
      }

      if (analysisData.externalData.linkedin) {
        prompt += '\n\nLinkedIn Professional Data:';
        if (analysisData.externalData.linkedin.experience.length > 0) {
          prompt += '\nWork Experience:';
          analysisData.externalData.linkedin.experience.slice(0, 3).forEach(exp => {
            prompt += `\n- ${exp.title} at ${exp.company}`;
          });
        }
        if (analysisData.externalData.linkedin.skills.length > 0) {
          prompt += `\nSkills: ${analysisData.externalData.linkedin.skills.join(', ')}`;
        }
      }

      if (analysisData.externalData.meta) {
        prompt += '\n\nMeta Social Data:';
        if (analysisData.externalData.meta.interests.length > 0) {
          prompt += `\nInterests: ${analysisData.externalData.meta.interests.join(', ')}`;
        }
      }
    }

    prompt += '\n\nPlease provide a detailed personality analysis based on this data.';

    return prompt;
  }

  /**
   * Update user profile from AI analysis
   * @param {Object} user - User object
   * @param {Object} aiAnalysis - AI analysis results
   * @returns {Object} Updated profile
   */
  static async updateProfileFromAnalysis(user, aiAnalysis) {
    const now = new Date();

    // Update Big Five traits
    if (aiAnalysis.bigFiveTraits) {
      Object.keys(aiAnalysis.bigFiveTraits).forEach(trait => {
        const traitData = aiAnalysis.bigFiveTraits[trait];
        user.personalityProfile[trait] = {
          score: traitData.score,
          confidence: traitData.confidence,
          lastUpdated: now
        };
      });
    }

    // Update interests
    if (aiAnalysis.interests) {
      user.personalityProfile.interests = aiAnalysis.interests.map(interest => ({
        category: interest.category,
        tags: interest.tags,
        confidence: interest.confidence,
        lastUpdated: now
      }));
    }

    // Update communication style
    if (aiAnalysis.communicationStyle) {
      user.personalityProfile.communicationStyle = {
        primary: aiAnalysis.communicationStyle.primary,
        secondary: aiAnalysis.communicationStyle.secondary,
        confidence: aiAnalysis.communicationStyle.confidence
      };
    }

    // Update decision making
    if (aiAnalysis.decisionMaking) {
      user.personalityProfile.decisionMaking = {
        style: aiAnalysis.decisionMaking.style,
        confidence: aiAnalysis.decisionMaking.confidence
      };
    }

    // Update work style
    if (aiAnalysis.workStyle) {
      user.personalityProfile.workStyle = {
        collaboration: aiAnalysis.workStyle.collaboration,
        autonomy: aiAnalysis.workStyle.autonomy,
        structure: aiAnalysis.workStyle.structure,
        innovation: aiAnalysis.workStyle.innovation
      };
    }

    // Update social preferences
    if (aiAnalysis.socialPreferences) {
      user.personalityProfile.socialPreferences = {
        groupSize: aiAnalysis.socialPreferences.groupSize,
        interactionStyle: aiAnalysis.socialPreferences.interactionStyle,
        leadershipTendency: aiAnalysis.socialPreferences.leadershipTendency
      };
    }

    // Add insights
    if (aiAnalysis.insights) {
      user.personalityProfile.insights.push(...aiAnalysis.insights.map(insight => ({
        type: insight.type,
        title: insight.title,
        description: insight.description,
        confidence: insight.confidence,
        createdAt: now
      })));
    }

    // Update completion percentage
    user.personalityProfile.completionPercentage = this.calculateCompletionPercentage(user);
    user.personalityProfile.lastComprehensiveUpdate = now;
    user.statistics.personalityUpdates += 1;

    await user.save();

    return user.personalityProfile;
  }

  /**
   * Generate personality insights
   * @param {Object} user - User object
   * @returns {Array} Generated insights
   */
  static async generateInsights(user) {
    try {
      const prompt = `Based on the following personality profile, generate 5-8 insightful observations about this person:

Big Five Traits:
- Openness: ${user.personalityProfile.openness.score}/100 (confidence: ${user.personalityProfile.openness.confidence}%)
- Conscientiousness: ${user.personalityProfile.conscientiousness.score}/100 (confidence: ${user.personalityProfile.conscientiousness.confidence}%)
- Extraversion: ${user.personalityProfile.extraversion.score}/100 (confidence: ${user.personalityProfile.extraversion.confidence}%)
- Agreeableness: ${user.personalityProfile.agreeableness.score}/100 (confidence: ${user.personalityProfile.agreeableness.confidence}%)
- Neuroticism: ${user.personalityProfile.neuroticism.score}/100 (confidence: ${user.personalityProfile.neuroticism.confidence}%)

Communication Style: ${user.personalityProfile.communicationStyle.primary} (${user.personalityProfile.communicationStyle.confidence}% confidence)
Decision Making: ${user.personalityProfile.decisionMaking.style} (${user.personalityProfile.decisionMaking.confidence}% confidence)

Interests: ${user.personalityProfile.interests.map(i => i.category).join(', ')}

Return a JSON array of insights with this structure:
[{"type": "strength|preference|tendency", "title": "string", "description": "string", "confidence": 0-100}]`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert personality psychologist providing insights about users based on their personality profiles."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const response = completion.choices[0].message.content;
      return JSON.parse(response);
    } catch (error) {
      console.error('Generate insights error:', error);
      return [];
    }
  }

  /**
   * Calculate profile completion percentage
   * @param {Object} user - User object
   * @returns {number} Completion percentage
   */
  static calculateCompletionPercentage(user) {
    let completed = 0;
    let total = 0;

    // Basic info
    total += 3;
    if (user.firstName) completed++;
    if (user.lastName) completed++;
    if (user.email) completed++;

    // Personality traits
    total += 5;
    ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'].forEach(trait => {
      if (user.personalityProfile[trait].confidence > 0) completed++;
    });

    // Communication and decision making
    total += 2;
    if (user.personalityProfile.communicationStyle.confidence > 0) completed++;
    if (user.personalityProfile.decisionMaking.confidence > 0) completed++;

    // Interests
    total += 1;
    if (user.personalityProfile.interests.length > 0) completed++;

    // Responses
    total += 1;
    if (user.responses.length >= 10) completed++;

    return Math.round((completed / total) * 100);
  }

  /**
   * Get personality profile
   * @param {string} userId - User ID
   * @returns {Object} Personality profile
   */
  static async getPersonalityProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user.personalityProfile;
  }

  /**
   * Update personality profile manually
   * @param {string} userId - User ID
   * @param {Object} updates - Profile updates
   * @returns {Object} Updated profile
   */
  static async updatePersonalityProfile(userId, updates) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (updates.traits) {
      Object.keys(updates.traits).forEach(trait => {
        if (user.personalityProfile[trait]) {
          user.personalityProfile[trait].score = updates.traits[trait];
          user.personalityProfile[trait].lastUpdated = new Date();
        }
      });
    }

    if (updates.interests) {
      user.personalityProfile.interests = updates.interests;
    }

    if (updates.insights) {
      user.personalityProfile.insights.push(...updates.insights);
    }

    user.personalityProfile.completionPercentage = this.calculateCompletionPercentage(user);
    await user.save();

    return user.personalityProfile;
  }

  /**
   * Get assessment questions
   * @param {string} category - Question category
   * @param {number} limit - Number of questions
   * @returns {Array} Assessment questions
   */
  static async getAssessmentQuestions(category = null, limit = 10) {
    // This would typically come from a database
    // For now, return predefined questions
    const questions = [
      {
        id: 'q1',
        question: 'How do you typically spend your weekends?',
        category: 'personality',
        options: ['Alone, relaxing at home', 'With close friends', 'Meeting new people', 'Working on projects']
      },
      {
        id: 'q2',
        question: 'When faced with a difficult decision, you usually:',
        category: 'decisionMaking',
        options: ['Analyze all the facts carefully', 'Go with your gut feeling', 'Ask others for advice', 'Avoid making the decision']
      },
      {
        id: 'q3',
        question: 'In a group setting, you tend to:',
        category: 'socialPreferences',
        options: ['Take charge and lead', 'Contribute ideas when asked', 'Observe and listen', 'Prefer to work alone']
      }
    ];

    if (category) {
      return questions.filter(q => q.category === category).slice(0, limit);
    }

    return questions.slice(0, limit);
  }

  /**
   * Refresh personality profile
   * @param {string} userId - User ID
   * @returns {Object} Refreshed profile
   */
  static async refreshPersonalityProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Re-analyze all available data
    const analysisData = await this.prepareAnalysisData(user, {});
    const aiAnalysis = await this.performAIAnalysis(analysisData);
    const updatedProfile = await this.updateProfileFromAnalysis(user, aiAnalysis);

    return updatedProfile;
  }

  /**
   * Get profile completion status
   * @param {string} userId - User ID
   * @returns {Object} Completion status
   */
  static async getProfileCompletion(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const completionPercentage = this.calculateCompletionPercentage(user);

    return {
      completionPercentage,
      responsesCount: user.responses.length,
      integrationsCount: Object.values(user.integrations).filter(integration => integration.connected).length,
      lastUpdate: user.personalityProfile.lastComprehensiveUpdate
    };
  }

  /**
   * Get next questions for user
   * @param {Object} user - User object
   * @returns {Array} Next questions
   */
  static async getNextQuestions(user) {
    // This would implement logic to determine what questions to ask next
    // based on current profile completion and existing responses
    const completedCategories = new Set(user.responses.map(r => r.category));
    const allCategories = ['personality', 'interests', 'values', 'preferences', 'behavior'];
    const missingCategories = allCategories.filter(cat => !completedCategories.has(cat));

    if (missingCategories.length === 0) {
      return [];
    }

    // Return questions for missing categories
    const questions = await this.getAssessmentQuestions(missingCategories[0], 3);
    return questions;
  }
}

module.exports = PersonalityService; 