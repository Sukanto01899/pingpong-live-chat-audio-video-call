const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const authenticate = require('../middleware/authenticateJwt');
const { getMessages } = require('../controllers/message.controller');

router.get('/:conversationId', authenticate, asyncHandler(getMessages));
router.post('/:conversationId', authenticate, asyncHandler());
router.put('/:id/read', authenticate, asyncHandler());

module.exports = router;