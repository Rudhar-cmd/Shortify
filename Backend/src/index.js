import dotenv from 'dotenv';
import app from './app.js';
import connectDb from './config/db.js'
dotenv.config();

const PORT = process.env.PORT || 5001;

const startserver = async()=>{
    try{
        await connectDb();
        app.listen(PORT,()=>{
            console.log(`Server Running on Port ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
}
startserver();