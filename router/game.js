'use strict';

const express = require('express');
const io = require('../socket');
const { playGame, initBoard } = require('../helper/gameManager');

const router = express.Router();

router.get('/new', async (req, res, next) => {
  // Starts new game
  try {
    const data = initBoard();
    io.getIO().emit('game', {
      event: 'NEW_GAME',
      payload: { boardData: data },
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/move', async (req, res, next) => {
  try {
    const { boardData, move } = req.body;
    const data = playGame(boardData, move);
    io.getIO().emit('game', { event: 'MOVE', payload: { boardData: data } });
    res.send({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
