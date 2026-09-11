import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const user_schema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true, 
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        },
        password : {
            type : String,
            required : true,
        },
        refreshToken : {
            type : String,
        }
    },{timestamps : true}
)

user_schema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
user_schema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

user_schema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

user_schema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

const User = mongoose.model("User",user_schema);

export default User;