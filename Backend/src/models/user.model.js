import {Schema,mongoose} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    userType:{
        type: String,
        required:[true,"user-type is requrired."]
    }
},{timestamps:true})

// password becrypt method
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password,10);
    next();
})

// password checker
userSchema.methods.isPasswordCorrect = async function(password) {
    return bcrypt.compare(password,this.password)  // it gives result in true/false way
}

// jwt token generator
userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            userType: this.userType
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("user",userSchema)