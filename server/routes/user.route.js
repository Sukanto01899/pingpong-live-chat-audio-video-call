const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const authenticate = require('../middleware/authenticateJwt');
const { getMyProfile, updateMyProfile, searchUserByQuery, getUserProfile, checkUniqueUsername, getAllUsers } = require('../controllers/users.controller');
const { multerUpload, imageUploadMiddleware } = require('../middleware/uploadImage');


router.get('/me',authenticate, asyncHandler(getMyProfile)); //get my profile
router.put('/me',authenticate,multerUpload, imageUploadMiddleware, asyncHandler(updateMyProfile)); // update my profile
router.get('/search',authenticate, asyncHandler(searchUserByQuery)); // search a user
router.get('/all',authenticate, asyncHandler(getAllUsers)); // get a user
router.get('/:id',authenticate, asyncHandler(getUserProfile)); // get user profile
router.get('/check/username', authenticate, asyncHandler(checkUniqueUsername))

module.exports = router;