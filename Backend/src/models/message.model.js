import mongoose,{Schema} from 'mongoose'


const messageSchema = new Schema ({
    message:{
        type:String,
        require:[true,"Message is requried to show to seller."],
        trim:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    room:{
        type: Schema.Types.ObjectId,
        ref:"Room"
    }
},{timestamps:true})

const Message = mongoose.model('Message',messageSchema);

export default Message;