const { default: mongoose } = require("mongoose");

const tokenSchema = mongoose.Schema({
  user: { type:String, ref: "User", required: true },
  token: { type: String, required: true },
  userAgent: { type: String },
  ip: { type: String },
}, {timestamps: true});

tokenSchema.index({createdAt: 1}, {expireAfterSeconds: 86400 });

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;