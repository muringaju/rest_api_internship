const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');

router.get('/', getPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
