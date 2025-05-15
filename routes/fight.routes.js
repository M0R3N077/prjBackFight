const express = require('express');
const router = express.Router();
const Fight = require('../models/Fight');

router.get('/', async (req, res) => {
  const fights = await Fight.find();
  res.json(fights);
});

router.post('/', async (req, res) => {
  const fight = new Fight(req.body);
  await fight.save();
  res.status(201).json(fight);
});

module.exports = router;
