const ApiError  = require('../utils/ApiError')
const Messages = require('../models/message.model')

const getMessages =async (req, res)=>{
    const limit = parseInt(req.query?.limit) || 15;
    const skip = parseInt(req.query.page) || 0
    const friendId = req.params?.conversationId;
    const userId = req.userId;

    console.log(limit, skip)

    if(!friendId) throw new ApiError(400, "Friend Id not found!");

    const messages = await Messages.findMessages({userId, friendId, limit, skip})

    console.log(messages)

    res.status(200).json(messages)
}

module.exports = {getMessages}