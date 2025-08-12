// models/Message.js
const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
    receiver: {
      type: String,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    media: {
      url: String,
      public_id: String, // If using Cloudinary
      type: {
        type: String, // image, video, file, etc.
        enum: ["image", "video", "file", "none"],
        default: "none",
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    deletedFor: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

messageSchema.statics.findMessages = async function ({userId, friendId, limit, skip}) {
  if (!userId || !friendId) throw new ApiError(400, "Please provide id!");
  const messages = await this.find({
    $or: [
      { sender: userId, receiver: friendId },
      { sender: friendId, receiver: userId },
    ],
  }).limit(limit).skip(limit * skip).sort({ createdAt: 1 })

  return messages;
};

messageSchema.statics.getMessageCount = async function (loggedUserId, friendId) {
  if (!loggedUserId || !friendId) throw new ApiError(400, "Please provide id!");
  const count = await this.countDocuments({
    $or: [
      { sender: loggedUserId, receiver: friendId },
      { sender: friendId, receiver: loggedUserId },
    ],
  });

  return count
};

module.exports = mongoose.model("Message", messageSchema);
