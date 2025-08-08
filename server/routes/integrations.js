const express = require('express');
const { body, validationResult } = require('express-validator');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');
const IntegrationService = require('../services/integrationService');

const router = express.Router();

/**
 * @route   POST /api/integrations/spotify/connect
 * @desc    Connect Spotify account
 * @access  Private
 */
router.post('/spotify/connect', [
  authMiddleware,
  body('accessToken')
    .notEmpty()
    .withMessage('Access token is required'),
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required'),
  body('expiresIn')
    .isInt({ min: 1 })
    .withMessage('Expires in must be a positive integer')
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

  const { accessToken, refreshToken, expiresIn } = req.body;
  const userId = req.user._id;

  try {
    const result = await IntegrationService.connectSpotify(userId, {
      accessToken,
      refreshToken,
      expiresIn
    });

    res.json({
      success: true,
      message: 'Spotify account connected successfully',
      data: {
        profile: result.profile,
        dataSynced: result.dataSynced
      }
    });
  } catch (error) {
    console.error('Spotify connection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to connect Spotify account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/spotify/disconnect
 * @desc    Disconnect Spotify account
 * @access  Private
 */
router.post('/spotify/disconnect', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    await IntegrationService.disconnectSpotify(userId);

    res.json({
      success: true,
      message: 'Spotify account disconnected successfully'
    });
  } catch (error) {
    console.error('Spotify disconnection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to disconnect Spotify account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/spotify/sync
 * @desc    Sync Spotify data
 * @access  Private
 */
router.post('/spotify/sync', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const syncResult = await IntegrationService.syncSpotifyData(userId);

    res.json({
      success: true,
      message: 'Spotify data synced successfully',
      data: {
        tracksSynced: syncResult.tracksSynced,
        artistsSynced: syncResult.artistsSynced,
        playlistsSynced: syncResult.playlistsSynced,
        lastSync: syncResult.lastSync
      }
    });
  } catch (error) {
    console.error('Spotify sync error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to sync Spotify data',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/youtube/connect
 * @desc    Connect YouTube account
 * @access  Private
 */
router.post('/youtube/connect', [
  authMiddleware,
  body('accessToken')
    .notEmpty()
    .withMessage('Access token is required'),
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required'),
  body('expiresIn')
    .isInt({ min: 1 })
    .withMessage('Expires in must be a positive integer')
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

  const { accessToken, refreshToken, expiresIn } = req.body;
  const userId = req.user._id;

  try {
    const result = await IntegrationService.connectYouTube(userId, {
      accessToken,
      refreshToken,
      expiresIn
    });

    res.json({
      success: true,
      message: 'YouTube account connected successfully',
      data: {
        profile: result.profile,
        dataSynced: result.dataSynced
      }
    });
  } catch (error) {
    console.error('YouTube connection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to connect YouTube account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/youtube/disconnect
 * @desc    Disconnect YouTube account
 * @access  Private
 */
router.post('/youtube/disconnect', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    await IntegrationService.disconnectYouTube(userId);

    res.json({
      success: true,
      message: 'YouTube account disconnected successfully'
    });
  } catch (error) {
    console.error('YouTube disconnection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to disconnect YouTube account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/youtube/sync
 * @desc    Sync YouTube data
 * @access  Private
 */
router.post('/youtube/sync', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const syncResult = await IntegrationService.syncYouTubeData(userId);

    res.json({
      success: true,
      message: 'YouTube data synced successfully',
      data: {
        videosSynced: syncResult.videosSynced,
        subscriptionsSynced: syncResult.subscriptionsSynced,
        playlistsSynced: syncResult.playlistsSynced,
        lastSync: syncResult.lastSync
      }
    });
  } catch (error) {
    console.error('YouTube sync error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to sync YouTube data',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/linkedin/connect
 * @desc    Connect LinkedIn account
 * @access  Private
 */
router.post('/linkedin/connect', [
  authMiddleware,
  body('accessToken')
    .notEmpty()
    .withMessage('Access token is required'),
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required'),
  body('expiresIn')
    .isInt({ min: 1 })
    .withMessage('Expires in must be a positive integer')
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

  const { accessToken, refreshToken, expiresIn } = req.body;
  const userId = req.user._id;

  try {
    const result = await IntegrationService.connectLinkedIn(userId, {
      accessToken,
      refreshToken,
      expiresIn
    });

    res.json({
      success: true,
      message: 'LinkedIn account connected successfully',
      data: {
        profile: result.profile,
        dataSynced: result.dataSynced
      }
    });
  } catch (error) {
    console.error('LinkedIn connection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to connect LinkedIn account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/linkedin/disconnect
 * @desc    Disconnect LinkedIn account
 * @access  Private
 */
router.post('/linkedin/disconnect', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    await IntegrationService.disconnectLinkedIn(userId);

    res.json({
      success: true,
      message: 'LinkedIn account disconnected successfully'
    });
  } catch (error) {
    console.error('LinkedIn disconnection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to disconnect LinkedIn account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/linkedin/sync
 * @desc    Sync LinkedIn data
 * @access  Private
 */
router.post('/linkedin/sync', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const syncResult = await IntegrationService.syncLinkedInData(userId);

    res.json({
      success: true,
      message: 'LinkedIn data synced successfully',
      data: {
        experienceSynced: syncResult.experienceSynced,
        educationSynced: syncResult.educationSynced,
        skillsSynced: syncResult.skillsSynced,
        lastSync: syncResult.lastSync
      }
    });
  } catch (error) {
    console.error('LinkedIn sync error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to sync LinkedIn data',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/meta/connect
 * @desc    Connect Meta account
 * @access  Private
 */
router.post('/meta/connect', [
  authMiddleware,
  body('accessToken')
    .notEmpty()
    .withMessage('Access token is required'),
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required'),
  body('expiresIn')
    .isInt({ min: 1 })
    .withMessage('Expires in must be a positive integer')
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

  const { accessToken, refreshToken, expiresIn } = req.body;
  const userId = req.user._id;

  try {
    const result = await IntegrationService.connectMeta(userId, {
      accessToken,
      refreshToken,
      expiresIn
    });

    res.json({
      success: true,
      message: 'Meta account connected successfully',
      data: {
        profile: result.profile,
        dataSynced: result.dataSynced
      }
    });
  } catch (error) {
    console.error('Meta connection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to connect Meta account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/meta/disconnect
 * @desc    Disconnect Meta account
 * @access  Private
 */
router.post('/meta/disconnect', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    await IntegrationService.disconnectMeta(userId);

    res.json({
      success: true,
      message: 'Meta account disconnected successfully'
    });
  } catch (error) {
    console.error('Meta disconnection error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to disconnect Meta account',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/meta/sync
 * @desc    Sync Meta data
 * @access  Private
 */
router.post('/meta/sync', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const syncResult = await IntegrationService.syncMetaData(userId);

    res.json({
      success: true,
      message: 'Meta data synced successfully',
      data: {
        postsSynced: syncResult.postsSynced,
        interestsSynced: syncResult.interestsSynced,
        groupsSynced: syncResult.groupsSynced,
        lastSync: syncResult.lastSync
      }
    });
  } catch (error) {
    console.error('Meta sync error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to sync Meta data',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/integrations/status
 * @desc    Get integration status for all services
 * @access  Private
 */
router.get('/status', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const status = await IntegrationService.getIntegrationStatus(userId);

    res.json({
      success: true,
      data: {
        status
      }
    });
  } catch (error) {
    console.error('Get integration status error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get integration status',
        details: error.message
      }
    });
  }
}));

/**
 * @route   GET /api/integrations/data
 * @desc    Get all integrated data
 * @access  Private
 */
router.get('/data', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const data = await IntegrationService.getAllIntegratedData(userId);

    res.json({
      success: true,
      data: {
        integrations: data
      }
    });
  } catch (error) {
    console.error('Get integrated data error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to get integrated data',
        details: error.message
      }
    });
  }
}));

/**
 * @route   POST /api/integrations/sync-all
 * @desc    Sync all connected integrations
 * @access  Private
 */
router.post('/sync-all', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const syncResults = await IntegrationService.syncAllIntegrations(userId);

    res.json({
      success: true,
      message: 'All integrations synced successfully',
      data: {
        results: syncResults
      }
    });
  } catch (error) {
    console.error('Sync all integrations error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to sync all integrations',
        details: error.message
      }
    });
  }
}));

module.exports = router; 