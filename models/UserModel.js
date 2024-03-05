// user.model.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  UserName: { type: String, required: true, unique: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  PhoneNumber: { type: String, required: true },
  Address: { type: String, required: true },
  BloodType: { type: String, required: true },
  MedicalHistory: { type: String, default: '' },
  Availability: { type: String, default: '' },
  Consent: { type: Boolean, required: true }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;