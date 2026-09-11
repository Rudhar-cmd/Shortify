import User from '../models/user.models.js'
import asyncHandler from "../utils/asyncHandler.js";
const generateAccessandRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId);
        if(!user){
            throw new Error("User Not Found");
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
        return {accessToken,refreshToken}
    }catch (error) {
        console.error(error);  
        throw error; 
    }
}
const registerUser = asyncHandler(async(req,res) =>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                message : "All fields are required"
            })
        }
        const existingUser = await User.findOne({
            $or :[
                {email},
                {username}
            ]
        });
        if(existingUser){
            return res.status(409).json({
                message : "Username or Email is Already Taken"
            })
        }
        
        const user = await User.create({
            username,
            email,
            password,
        })

        const createdUser = await User.findById(user._id).select("-password")
        return res.status(201).json({
            message : "User Registered Succesfully",
            user : createdUser,
        })
    }  catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
})
const loginUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username && !email){
        return res.status(400).json({
            message : "Email or UserName Required"
        })
    }
    const isUserExist = await User.findOne({
        $or : [
            {email},
            {username},
        ]
    })
    if(!isUserExist){
        return res.status(404).json({
            message : "User Did'nt Exists"
        })
    }
    if(!password){
        return res.status(400).json({
            message: "Password is required"
        });
    }
    const Password = await isUserExist.isPasswordCorrect(password);
    if(!Password){
        return res.status(401).json({
            message: "Password is InCorrect"
        });
    }
    const {accessToken,refreshToken} = await generateAccessandRefreshToken(isUserExist._id);
    const loggedUser = await User.findById(isUserExist._id).select(
        "-password -refreshToken"
    );
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };
    return res
    .status(200)
    .cookie('accessToken',accessToken,options)
    .cookie('refreshToken',refreshToken,options)
    .json({
        message : "User Logged In",
        user : loggedUser,
        accessToken,
        refreshToken,
    })
})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken: undefined,
            }
        },
        {
            returnDocument: "after",
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };
    res.clearCookie('accessToken',options);
    res.clearCookie('refreshToken',options);
    return res
    .status(200)
    .json({
        message : "User Logged Out"
    });
})

const currentUser = (req,res)=>{
    return res.status(200)
    .json({
        user: req.user,
    })
}

const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword , newPassword} = req.body;
    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).json({
            message: "NO User Found"
        });
    }
    const CheckPassword = await user.isPasswordCorrect(oldPassword);
    if(!CheckPassword){
        return res.status(401).json({
            message: "Password is InCorrect"
        });
    }
    if (!newPassword) {
        return res.status(400).json({
            message: "New password is required"
        });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200)
    .json({
        message : "Password Updated SuccesFully"
    })
})

const updateDetails = asyncHandler(async(req,res)=>{
    const {email,username} = req.body;
    if(!email || !username){
        return res.status(400).json({
            message: "Field Required"
        });
    }
    const UserExits = await User.findOne({
        $or : [
            {email},
            {username}
        ],
        _id : {$ne : req.user._id}
    })
    if(UserExits){
        return res.status(409).json({
            message: "User Name Already Taken"
        });
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,{
            $set : {
                username,
                email,
            }
        },
        {new:true},
    ).select('-password')
    if(!user){
        return res.status(404).json({
            message: "NO User Found"
        });
    }
    return res
    .status(200)
    .json({
        message : "Details Update SuccesFully",
        user,
    })
})

export {registerUser,logoutUser,loginUser,currentUser,changePassword,updateDetails};