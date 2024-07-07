import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

const generateAccessToken = async(userId) =>{
    try{
        const user = await User.findById(userId);

        const accessToken = user.generateToken();

        user.accessToken = accessToken;
        await user.save({validateBeforeSave: false});

        return accessToken;
    }
    catch(err){
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password,userType} = req.body;

    if(
        [name,email,password,userType].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required.")
    }
    try {
        const localFilePath = req.file?.path;
        if(!localFilePath){
            throw new ApiError(400,"LocalFile path is found.")
        }
        const avatar = await uploadOnCloudinary(localFilePath);

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
            userType,
            avatar:avatar?.url || ""
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
    } catch (error) {
        console.log(error);
        throw new ApiError(404,"Error encouter while registering user.")
    }
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
    const accessToken = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password")
    const options = {
        httpOnly: true,
        secure: true
    }
    console.log(loggedInUser);
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(new ApiResponse(200,{ user: loggedInUser },"User login successfully."))
})

const logoutUser = asyncHandler(async(req,res) => {
    const accessToken = req.cookies?.accessToken;
    res.clearCookie(accessToken);
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email, newpassword } = req.body;

    // Check if email and new password are provided
    if (![email, newpassword].every(field => field && field.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update the user's password
    user.password = newpassword;
    await user.save({ validateBeforeSave: false }); 

    // Send success response
    res.status(200).json({ message: "Password has been reset successfully" });
});

const changePassword = asyncHandler(async(req,res) => {

    const {oldpassword,newpassword} = req.body;

    if(
        [oldpassword,newpassword].some((field) => {field?.trim === ''})
    ){
        throw new ApiError(400,"All fields are required.")
    }
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(401 , "Unauthorized request")
    }
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)  // basically return payload that we mentioned while creating token.
    const user = await User.findById(decodedToken?._id)
    if(!user){
        throw new ApiError(401, "Invalid Access Token")
    }
    // console.log(user);
    const result = await user.isPasswordCorrect(oldpassword);

    if(!result){
        throw new ApiError(400,"Old password is wrong")
    }

    user.password = newpassword;
    await user.save({validateBeforeSave:false})

    res
    .status(200)
    .json(new ApiResponse(200,user,"Password changed successfully"))
})

const updateProfile = asyncHandler(async(req,res) => {
    try {
        const {name,email} = req.body;
        const localFilePath = req.file?.path;
        if(
            [name,email].some((field) => {field?.trim === ''})
        ){
            throw new ApiError(400,"All fields are required.")
        }

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401 , "Unauthorized request")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)  // basically return payload that we mentioned while creating token.
        const user = await User.findById(decodedToken?._id).select("-password");
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        
        const avatar = await uploadOnCloudinary(localFilePath);
        
        user.name = name;
        user.email = email;
        user.avatar = avatar?.url
        await user.save({validateBeforeSave:false})

        res
        .status(200)
        .json(new ApiResponse(200,{user},"user updated successfully"))
    } catch (error) {
        console.log(error);
        throw new ApiError(404,"something went wrong while updating profile.")
    }
})

const deleteProfile = asyncHandler(async(req,res) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(401 , "Unauthorized request")
    }
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)  // basically return payload that we mentioned while creating token.
    res.clearCookie(token);
    await User.findByIdAndDelete(decodedToken?._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    }

    res
    .status(201)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(201,"User deleted successfully."))
})

const checkAuth = asyncHandler(async(req,res) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(401 , "Unauthorized request")
    }
    console.log(token);
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)  // basically return payload that we mentioned while creating token.
    res.clearCookie(token);
    const user = await User.findById(decodedToken?._id);

    if(!user){
        throw new ApiError(400,"User not found!! May be token expired.")
    }

    res
    .status(200)
    .json(new ApiResponse(200,{},"Everything is ok."))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    changePassword,
    updateProfile,
    deleteProfile,
    checkAuth
}
