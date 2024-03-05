import User from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { UserName, FirstName, LastName,Password,Email,PhoneNumber,Address,BloodType,MedicalHistory,Availability,Consent} = req.body;
  try {
    const existingUser = await User.findOne({ Email });
    if(existingUser){
       console.log('Username:', existingUser);
       return res.status(400).json('Email already exists!');
     }
    const hashedPassword = await bcryptjs.hashSync(Password, 10);
    const newUser = new User({ UserName, FirstName, LastName,Password:hashedPassword ,Email,PhoneNumber,Address,BloodType,MedicalHistory,Availability,Consent});
    await newUser.save();
    res.status(201).json('User created successfully!');
    console.log(newUser
    );
  } catch (error) {
    res.status(500).json('Internal Server Error');
    next(error);
  }
};
export const signin = async (req, res, next) => {
    const { Email, Password } = req.body;
    try {
      const validUser = await User.findOne({ Email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(Password, validUser.Password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  export const signout = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };