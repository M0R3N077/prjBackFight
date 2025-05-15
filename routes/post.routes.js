const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
}

router.get('/:fightId', async (req, res) => {
  const posts = await Post.find({ fightId: req.params.fightId }).populate('userId', 'username');
  res.json(posts);
});

router.post('/', auth, async (req, res) => {
  const { fightId, content, image } = req.body;
  const post = new Post({ fightId, content, image, userId: req.userId });
  await post.save();
  res.status(201).json(post);
});

module.exports = router;
