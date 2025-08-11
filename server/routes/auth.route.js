const express = require('express');
const asyncHandler = require('express-async-handler');
const { register, login, refresh, logout } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
// router.post('/otp/send', asyncHandler());
// router.post('/otp/verify', asyncHandler());
router.post('/refresh', asyncHandler(refresh));
router.post('/logout', asyncHandler(logout));


module.exports = router;