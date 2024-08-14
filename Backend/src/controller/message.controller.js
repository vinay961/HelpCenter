import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js' 
import Message from '../models/message.model.js'

const messageHandle = asyncHandler(async(req,res) => {
    const { message} = req.body
    if(!message){
        
        throw new ApiError(404,"Message not found")
    }
    Message.create({
        message
    })
    return res.status(201).json(new ApiResponse(201,"Message successfully saved."))
})

export {
    messageHandle
}