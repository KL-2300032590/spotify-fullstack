// src/models/UserModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  profileImage: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
