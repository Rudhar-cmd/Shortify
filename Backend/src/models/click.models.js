import mongoose from 'mongoose'
const click_schema = new mongoose.Schema({
    url : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Url',
        required : true,
    },
    ip :{
        type : String,
        required : true,
    },
    userAgent : {
        type : String,
        required : true,
    },
    referrer : {
        type : String,
        default: null,
    },
    clickedAt : {
        type : Date,
        default : Date.now,
    }
})
export const Click = mongoose.model('Click', click_schema);