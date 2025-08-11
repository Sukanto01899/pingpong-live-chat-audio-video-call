const { default: mongoose } = require("mongoose");
const ApiError = require("../utils/ApiError");

const friendshipSchema = mongoose.Schema({
    requester: {
        type: String,
        ref: 'User'
    },
    recipient:{
        type: String,
        ref: 'User'
    }
})

friendshipSchema.statics.findUserFriends =async function(userId){
    if(!userId) throw new ApiError(400, "User id need")
    const friends =await this.find({
        $or: [
            {requester: userId},
            {recipient: userId}
        ]
    }).populate("requester").populate("recipient")


    return friends;
}

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;