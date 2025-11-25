const express = require('express');
const router = express.Router();
const { getUserDashboard, subscribe, uploadBook, toggleBookmark, getBookmarks } = require('../controllers/users.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/dashboard', protect, getUserDashboard);
router.post('/subscribe', protect, subscribe);
router.post('/upload', protect, upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'book', maxCount: 1 }]), uploadBook);
router.post('/bookmarks', protect, toggleBookmark);
router.get('/bookmarks', protect, getBookmarks);

module.exports = router;
