const express = require('express');
const { body, validationResult } = require('express-validator');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');
const PersonalityService = require('../services/personalityService');

const router = express.Router();

/**
 * @route   POST /api/personality/analyze
 * @desc    Analyze user inputs and update personality profile
 * @access  Private
 */
router.post('/analyze', [
  authMiddleware,
  body('responses')
    .isArray({ min: 1 })
    .withMessage('At least one response is required'),
  body('responses.*.questionId')
    .notEmpty()
    .withMessage('Question ID is required for each response'),
  body('responses.*.question')
    .notEmpty()
    .withMessage('Question text is required for each response'),
  body('responses.*.answer')
    .notEmpty()
    .withMessage('Answer is required for each response'),
  body('responses.*.category')
    .isIn(['personality', 'interests', 'values', 'preferences', 'behavior'])
    .withMessage('Category must be one of: personality, interests, values, preferences, behavior')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors.array()
      }
    });
  }

  const { responses, externalData } = req.body;
  const userId = req.user._id;

  try {
    // Analyze responses and update personality profile
    const analysisResult = await PersonalityService.analyzeUserInputs(userId, responses, externalData);

    res.json({
      success: true,
      message: 'Personality analysis completed successfully',
      data: {
        profile: analysisResult.profile,
        insights: analysisResult.insights,
        completionPercentage: analysisResult.completionPercentage,
        nextQuestions: analysisResult.nextQuestions
      }
    });
  } catch (error) {
    console.error('Personality analysis error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to analyze personality data',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/personality/profile
 * @desc    Get user's personality profile
 * @access  Private
 */
router.get('/profile', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const profile = await PersonalityService.getPersonalityProfile(userId);

    res.json({
      success: true,
      data: {
        profile
      }
    });
  } catch (error) {
    console.error('Get personality profile error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve personality profile',
        details: error.message
      }
    });
  }
}));

/**
 * @route   PUT /api/personality/update
 * @desc    Update specific personality traits manually
 * @access  Private
 */
router.put('/update', [
  authMiddleware,
  body('traits')
    .isObject()
    .withMessage('Traits must be an object'),
  body('traits.openness')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Openness must be between 0 and 100'),
  body('traits.conscientiousness')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Conscientiousness must be between 0 and 100'),
  body('traits.extraversion')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Extraversion must be between 0 and 100'),
  body('traits.agreeableness')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Agreeableness must be between 0 and 100'),
  body('traits.neuroticism')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Neuroticism must be between 0 and 100')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors.array()
      }
    });
  }

  const { traits, interests, insights } = req.body;
  const userId = req.user._id;

  try {
    const updatedProfile = await PersonalityService.updatePersonalityProfile(userId, {
      traits,
      interests,
      insights
    });

    res.json({
      success: true,
      message: 'Personality profile updated successfully',
      data: {
        profile: updatedProfile
      }
    });
  } catch (error) {
    console.error('Update personality profile error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to update personality profile',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/personality/questions
 * @desc    Get personality assessment questions
 * @access  Private
 */
router.get('/questions', authMiddleware, asyncHandler(async (req, res) => {
  const { category, limit = 10 } = req.query;

  try {
    const questions = await PersonalityService.getAssessmentQuestions(category, parseInt(limit));

    res.json({
      success: true,
      data: {
        questions
      }
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve assessment questions',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/personality/insights
 * @desc    Get personality insights and recommendations
 * @access  Private
 */
router.get('/insights', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const insights = await PersonalityService.generateInsights(userId);

    res.json({
      success: true,
      data: {
        insights
      }
    });
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to generate personality insights',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/personality/refresh
 * @desc    Refresh personality profile based on all available data
 * @access  Private
 */
router.post('/refresh', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const refreshedProfile = await PersonalityService.refreshPersonalityProfile(userId);

    res.json({
      success: true,
      message: 'Personality profile refreshed successfully',
      data: {
        profile: refreshedProfile
      }
    });
  } catch (error) {
    console.error('Refresh personality profile error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to refresh personality profile',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/personality/completion
 * @desc    Get personality profile completion status
 * @access  Private
 */
router.get('/completion', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const completion = await PersonalityService.getProfileCompletion(userId);

    res.json({
      success: true,
      data: {
        completion
      }
    });
  } catch (error) {
    console.error('Get completion status error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get completion status',
        details: error.message
      }
    });
  }
}));

module.exports = router; 