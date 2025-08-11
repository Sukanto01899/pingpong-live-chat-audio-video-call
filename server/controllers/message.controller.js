const ApiError  = require('../utils/ApiError')
const Messages = require('../models/message.model')

const getMessages =async (req, res)=>{
    const friendId = req.params?.conversationId;
    const userId = req.userId;

    if(!friendId) throw new ApiError(400, "Friend Id not found!");

    const messages = await Messages.findMessages(userId, friendId)

    // console.log(messages)

    res.status(200).json(messages)
}

module.exports = {getMessages}