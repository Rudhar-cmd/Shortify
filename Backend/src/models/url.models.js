import mongoose from "mongoose";
const Url_Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        originalUrl : {
            type : String,
            required : true,
        },
        shortCode : {
            type : String,
            required : true,
            unique: true,
        },
        clicks : {
            type : Number,
            default : 0,
        },
    },{timestamps:true}
)
export const Url = mongoose.model('Url',Url_Schema);