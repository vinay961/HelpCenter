import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

import {User}  from '../models/user.model.js';
import  Room  from '../models/room.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import path from 'path'

const roomRegister = asyncHandler(async (req, res) => {
    const { area, district, state, phoneNumber, message } = req.body;

    if ([area, district, state, phoneNumber, message].some(field => field?.trim() === '')) {
        throw new ApiError(401, "All fields are required.");
    }
    // console.log(req.file);
    const localFilePath = req.file?.path;

    const token = req.cookies?.accessToken;
    if (!token) {
        throw new ApiError(400, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }
    // console.log(localFilePath)
    const roomImage = await uploadOnCloudinary(localFilePath)
    // console.log(roomImage);

    const room = await Room.create({
        area,
        district,
        state,
        roomImage:roomImage?.url || "",
        phoneNumber,
        message,
        user: {
            id: user._id,
            name: user.name
        }
    });

    res
    .status(201)
    .json(new ApiResponse(201, {room}, "Room registered successfully"));
});

const getRooms = asyncHandler(async(req,res) => {
    
    const rooms = await Room.find();
    res.status(201).json(new ApiResponse(201,rooms,"Rooms fetched successfully."))
})

export { 
    roomRegister,
    getRooms
};
