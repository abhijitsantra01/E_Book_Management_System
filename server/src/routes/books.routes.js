const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook } = require('../controllers/books.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', protect, admin, createBook);

module.exports = router;
