import mongoose from 'mongoose'
 
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo Db Connected")
    }
    catch(error){
        console.log("Mongo Db Connection Failed",error.message)
        process.exit(1)
    }
}
export default connectDb;