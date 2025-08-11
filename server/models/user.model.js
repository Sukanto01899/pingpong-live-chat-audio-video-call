const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const generateUID = require("../utils/generateUID");
const ApiError = require("../utils/ApiError");

const userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, sparse: true, unique: true },
    phone: { type: String, sparse: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: { url: String, public_id: String },
    isVerified: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    bio: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("validate", async function (next) {
  if (!this._id) {
    let newId;
    let exists = true;

    while (exists) {
      newId = generateUID();
      exists = await this.constructor.exists({ _id: newId });
    }

    this._id = newId;
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (this.isNew && this._id && !this.username) {
    const base = this.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    this.username = `${base}_${this._id}`;
  }

  next();
});

userSchema.statics.createNewUser = async function ({
  name,
  email,
  phone,
  password,
}) {
  if (!phone && !email) {
    throw new ApiError(400, "Either email or phone must be provided.");
  }

  const query = email ? { email } : { phone };
  let user = await this.findOne(query);

  if (user) {
    throw new ApiError(400, "User already registered!");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  user = await this.create({
    name,
    password: hashedPassword,
    ...query,
  });

  // Convert to plain object
  userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

userSchema.statics.findUserByValidPassword = async function (query, password) {
  const user = await this.findOne(query).select("+password");

  if (!user) {
    throw new ApiError(400, "User not registered!");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Password not match!");
  }

  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.statics.checkUserByHandler = async function(userHandler) {
  const user = await this.findOne({...userHandler});
  if(user) return true;
  else return false
}

const User = mongoose.model("User", userSchema);

module.exports = User;
