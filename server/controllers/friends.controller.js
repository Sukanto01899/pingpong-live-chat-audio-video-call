const Friendship = require("../models/friendship.model");

const getFriends = async (req, res) => {
  const userId = req.userId;

  const friends = await Friendship.findUserFriends(userId);

  res.status(200).json(friends);
};

module.exports = { getFriends };
