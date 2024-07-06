import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const messageHandle = asyncHandler(async(req,res) => {
    const { message,roomBooked } = req.body
    if(!message){
        throw new ApiError(400,"Message typing error")
    }


})