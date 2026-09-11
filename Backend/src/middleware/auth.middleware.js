import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Request",
            });
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decode._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res.status(401).json({
                message: "No User Found",
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Access Token Expired or Invalid",
        });
    }
};

export default verifyJWT;