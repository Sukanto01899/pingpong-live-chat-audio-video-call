const Friendship = require("../models/friendship.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const cloudinary = require("../utils/cloudinary");
const { updateInputValidation } = require("../utils/zodValidation");

const getMyProfile = async (req, res) => {
  const myUserId = req.userId;
  const user = await User.findOne({ _id: myUserId });

  if (!user) {
    throw new ApiError(400, "User not found!");
  }

  res.status(200).json({ success: true, user });
};

const updateMyProfile = async (req, res) => {
  const avatar = req.avatar;
  const user = req.user;
  const { name, email, phone, username, bio } = req.body;

  //   Ready update data object
  const updateData = {
    name: name || user.name,
    bio: bio || user.bio,
  };

  //   Check username avalblelity
  if (username) {
    const isExistUser = await User.checkUserByHandler({ username });
    if (isExistUser) {
      //if user available return error and remove avatar from cloud
      if (avatar && avatar.public_id) {
        await cloudinary.uploader.destroy(avatar.public_id);
      }
      throw new ApiError(401, "This Username already exist!");
    }
    {
      updateData.username = username;
    }
  }

  //   Check email/phone avalblelity
  if (email || phone) {
    let userHandler = email ? { email } : { phone };
    const isExistUser = await User.checkUserByHandler({ ...userHandler });

    if (isExistUser) {
      if (avatar && avatar.public_id) {
        await cloudinary.uploader.destroy(avatar.public_id);
      }
      throw new ApiError(401, "This email/phone already exist!");
    }

    if (userHandler.email) {
      updateData.email = email;
    } else {
      updateData.phone = phone;
    }
  }

  const validationResult = updateInputValidation(updateData); //Zod validation
  const updatedUser = await User.findByIdAndUpdate(
    { _id: user._id },
    { ...validationResult, avatar },
    { new: true }
  );

  res.status(201).json({ success: true, user: updatedUser });
};

const searchUserByQuery = async (req, res) => {
    const searchQuery = req.query.search || "";

    const users = await User.find({
        $or:[
            {username: {$regex: `^${searchQuery}`, $options: 'i'}},
            {name: {$regex: `^${searchQuery}`, $options: 'i'}}
        ]
    }).select("_id name username avatar isOnline");

    if(!users || (users.length < 1)){
        throw new ApiError(400, "Users not found!")
    }

    res.status(200).json({success: true, users})
};

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  if (!id || (id?.length !== 6)) {
    throw new ApiError(401, "Please enter a valid id to get user");
  }

  const user = await User.findOne({ _id: id }).select("-password -isVerified");
  if (!user) {
    throw new ApiError(400, "No user found!");
  }
  res.status(200).json({ success: true, user });
};

const checkUniqueUsername = async (req, res) => {
  const username = req.query.username || "";
  const isExistUser = await User.checkUserByHandler({ username });

  if (isExistUser) {
    res.status(201).json({ success: true, isAvailable: false });
  } else {
    res.status(201).json({ success: true, isAvailable: true });
  }
};

// Get all users who not in friends list
const getAllUsers = async (req, res)=>{
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;
  const userId = req.userId;

  const userFriends = await Friendship.findUserFriends(userId);
 
  const allFriendsIds = userFriends.map(fr => {
    if(fr.requester._id === userId){
      return fr.recipient._id
    }else{
      return fr.requester._id
    }
  })

  console.log(allFriendsIds)

  const users = await User.find({_id: {$nin: [userId, ...allFriendsIds]}}).skip(limit * page).limit(limit);
  // console.log(users)

  res.status(200).json(users)
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  searchUserByQuery,
  getUserProfile,
  checkUniqueUsername,
  getAllUsers
};
