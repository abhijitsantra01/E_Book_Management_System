const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, approveUpload, rejectUpload } = require('../controllers/admin.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.get('/stats', protect, admin, getStats);
router.get('/users', protect, admin, getAllUsers);
router.put('/uploads/:id/approve', protect, admin, approveUpload);
router.put('/uploads/:id/reject', protect, admin, rejectUpload);

module.exports = router;
