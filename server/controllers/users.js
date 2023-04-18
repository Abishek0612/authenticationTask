import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

//Register user

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //create the user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User Registered successfully",
    data: user,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({
    email,
  });
  if(userFound && (await bcrypt.compare(password, userFound?.password))){
    res.json({
      status:'success',
      message:'User logged in successfully',
      userFound,
    })
  }else{
    throw new Error('Invalid login credentials')
  }
});


export const getUserData = asyncHandler(async (req, res) => {
  const {name, email} = req.body;

  const getUser = await User.findById(req.params.id);
  if(!getUser){
    throw new Error('User not found')
  }
  res.json({
    status:'success',
    message:'User fetched successfully',
    getUser,
  })
})