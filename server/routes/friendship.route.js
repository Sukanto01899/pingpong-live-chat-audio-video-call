const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const authenticate = require('../middleware/authenticateJwt');
const { getFriends } = require('../controllers/friends.controller');


router.get('/my', authenticate, asyncHandler(getFriends));
router.post('/add/:id', authenticate, asyncHandler());
router.delete('/remove/:id', authenticate, asyncHandler());

module.exports =  router;