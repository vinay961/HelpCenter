import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema({
    area: {
        type: String,
        required: [true, "Area is required."],
        trim: true
    },
    district: {
        type: String,
        required: [true, "District is required."],
        trim: true
    },
    state: {
        type: String,
        required: [true, "State is required."],
        trim: true
    },
    roomImage:{
        type: String, // cloudinary url comes which is stored by us.
        required: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required."],
        trim: true,
        // validate: {
        //     validator: function(v) {
        //         return /\+?[0-9]{7,15}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // }
    },
    message:{
        type: String,
        required:false
    },
    price:{
        type: String,
        required: [true, "Price is required as user want to see it."]
    },
    gender:{
        type: String,
        required:true
    },
    roomType:{
        type: String,
        reqquired:false
    },
    user: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true }
    }
},
{timestamps:true});

const Room = mongoose.model('Room', roomSchema);

export default Room;
