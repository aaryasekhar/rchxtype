const express = require('express');
const { body, validationResult } = require('express-validator');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');
const MatchingService = require('../services/matchingService');

const router = express.Router();

/**
 * @route   GET /api/matching/suggestions
 * @desc    Get user matching suggestions
 * @access  Private
 */
router.get('/suggestions', authMiddleware, asyncHandler(async (req, res) => {
  const { limit = 10, offset = 0, filters } = req.query;
  const userId = req.user._id;

  try {
    const suggestions = await MatchingService.getMatchingSuggestions(userId, {
      limit: parseInt(limit),
      offset: parseInt(offset),
      filters: filters ? JSON.parse(filters) : {}
    });

    res.json({
      success: true,
      data: {
        suggestions,
        total: suggestions.length,
        hasMore: suggestions.length === parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get matching suggestions error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get matching suggestions',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/matching/connect
 * @desc    Send connection request to another user
 * @access  Private
 */
router.post('/connect', [
  authMiddleware,
  body('targetUserId')
    .notEmpty()
    .withMessage('Target user ID is required'),
  body('message')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Message must be less than 500 characters')
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

  const { targetUserId, message } = req.body;
  const userId = req.user._id;

  try {
    const result = await MatchingService.sendConnectionRequest(userId, targetUserId, message);

    res.json({
      success: true,
      message: 'Connection request sent successfully',
      data: {
        connection: result.connection
      }
    });
  } catch (error) {
    console.error('Send connection request error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to send connection request',
        details: error.message
      }
    });
  }
}));

/**
 * @route   PUT /api/matching/connect/:connectionId
 * @desc    Accept or reject connection request
 * @access  Private
 */
router.put('/connect/:connectionId', [
  authMiddleware,
  body('action')
    .isIn(['accept', 'reject', 'block'])
    .withMessage('Action must be accept, reject, or block')
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

  const { connectionId } = req.params;
  const { action } = req.body;
  const userId = req.user._id;

  try {
    const result = await MatchingService.handleConnectionRequest(userId, connectionId, action);

    res.json({
      success: true,
      message: `Connection request ${action}ed successfully`,
      data: {
        connection: result.connection
      }
    });
  } catch (error) {
    console.error('Handle connection request error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to handle connection request',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/matching/connections
 * @desc    Get user's connections
 * @access  Private
 */
router.get('/connections', authMiddleware, asyncHandler(async (req, res) => {
  const { status, limit = 20, offset = 0 } = req.query;
  const userId = req.user._id;

  try {
    const connections = await MatchingService.getUserConnections(userId, {
      status,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        connections,
        total: connections.length,
        hasMore: connections.length === parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get connections error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get connections',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/matching/requests
 * @desc    Get pending connection requests
 * @access  Private
 */
router.get('/requests', authMiddleware, asyncHandler(async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;
  const userId = req.user._id;

  try {
    const requests = await MatchingService.getPendingRequests(userId, {
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        requests,
        total: requests.length,
        hasMore: requests.length === parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get pending requests error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get pending requests',
        details: error.message
      }
    });
  }
}));

/**
 * @route   DELETE /api/matching/connect/:connectionId
 * @desc    Remove connection
 * @access  Private
 */
router.delete('/connect/:connectionId', authMiddleware, asyncHandler(async (req, res) => {
  const { connectionId } = req.params;
  const userId = req.user._id;

  try {
    await MatchingService.removeConnection(userId, connectionId);

    res.json({
      success: true,
      message: 'Connection removed successfully'
    });
  } catch (error) {
    console.error('Remove connection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to remove connection',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/matching/compatibility/:userId
 * @desc    Get compatibility score with another user
 * @access  Private
 */
router.get('/compatibility/:userId', authMiddleware, asyncHandler(async (req, res) => {
  const { userId: targetUserId } = req.params;
  const userId = req.user._id;

  try {
    const compatibility = await MatchingService.getCompatibilityScore(userId, targetUserId);

    res.json({
      success: true,
      data: {
        compatibility
      }
    });
  } catch (error) {
    console.error('Get compatibility score error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get compatibility score',
        details: error.message
      }
    });
  }
}));

/**
 * @route   PUT /api/matching/preferences
 * @desc    Update matching preferences
 * @access  Private
 */
router.put('/preferences', [
  authMiddleware,
  body('ageRange.min')
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage('Minimum age must be between 18 and 100'),
  body('ageRange.max')
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage('Maximum age must be between 18 and 100'),
  body('location.type')
    .optional()
    .isIn(['anywhere', 'nearby', 'specific'])
    .withMessage('Location type must be anywhere, nearby, or specific'),
  body('location.radius')
    .optional()
    .isInt({ min: 0, max: 500 })
    .withMessage('Radius must be between 0 and 500'),
  body('interests.required')
    .optional()
    .isArray()
    .withMessage('Required interests must be an array'),
  body('interests.preferred')
    .optional()
    .isArray()
    .withMessage('Preferred interests must be an array'),
  body('interests.excluded')
    .optional()
    .isArray()
    .withMessage('Excluded interests must be an array')
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

  const preferences = req.body;
  const userId = req.user._id;

  try {
    const updatedPreferences = await MatchingService.updateMatchingPreferences(userId, preferences);

    res.json({
      success: true,
      message: 'Matching preferences updated successfully',
      data: {
        preferences: updatedPreferences
      }
    });
  } catch (error) {
    console.error('Update matching preferences error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to update matching preferences',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/matching/preferences
 * @desc    Get user's matching preferences
 * @access  Private
 */
router.get('/preferences', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const preferences = await MatchingService.getMatchingPreferences(userId);

    res.json({
      success: true,
      data: {
        preferences
      }
    });
  } catch (error) {
    console.error('Get matching preferences error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get matching preferences',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/matching/refresh
 * @desc    Refresh matching suggestions
 * @access  Private
 */
router.post('/refresh', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await MatchingService.refreshMatchingSuggestions(userId);

    res.json({
      success: true,
      message: 'Matching suggestions refreshed successfully',
      data: {
        newSuggestions: result.newSuggestions,
        totalSuggestions: result.totalSuggestions
      }
    });
  } catch (error) {
    console.error('Refresh matching suggestions error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to refresh matching suggestions',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/matching/analytics
 * @desc    Get matching analytics
 * @access  Private
 */
router.get('/analytics', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const analytics = await MatchingService.getMatchingAnalytics(userId);

    res.json({
      success: true,
      data: {
        analytics
      }
    });
  } catch (error) {
    console.error('Get matching analytics error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get matching analytics',
        details: error.message
      }
    });
  }
}));

module.exports = router; 