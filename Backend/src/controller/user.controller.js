import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

import {User} from '../models/user.model.js'

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password,userType} = req.body;

    if(
        [name,email,password,userType].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required.")
    }

    const userExist = await User.findOne({
        $or:[{name},{email}]
    })
    if(userExist) {
        throw new ApiError(400 , "User with email or username already exists.")
    }
    const user = await User.create({
        name,
        email,
        password,
        userType
    })
    const createUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createUser){
        throw new ApiError(500, "Something went wrong while registring the user.")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser , "User registered Successfully.")
    )
})

const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    if(
        [email,password].some((field) => field?.trim === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404,"User doesn't exist.")
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(400,"Entered Password is incorrect.");
    }
    const loggedInUser = await User.findById(user._id).select("-password")
    
    return res.status(200).json(new ApiResponse(200,{user:loggedInUser},"User login successfully."))
})

export {
    registerUser,
    loginUser
}
