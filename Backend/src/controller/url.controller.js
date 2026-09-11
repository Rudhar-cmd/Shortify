import asyncHandler from '../utils/asyncHandler.js';
import {Url} from '../models/url.models.js';
import { Click } from '../models/click.models.js';
const createShortUrl = asyncHandler(async(req,res)=>{
    const {originalUrl} = req.body;
    if(!originalUrl){
        return res.status(400).json({
            message : "The Original Link is Not Given",
        })
    }
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const shortCode = code;
    const url = await Url.create({
        user : req.user._id,
        originalUrl,
        shortCode,
    })
    return res.status(200).json({
        message : "Shorter Url is Created Successfully",
        url,
    })
})

const redirectToOriginalUrl = asyncHandler(async (req, res) => {

    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
        return res.status(404).json({
            message: "Short URL Not Found"
        });
    }

    const ip = req.ip;
    const userAgent = req.get("user-agent");
    const referrer = req.get("referer");

    await Click.create({
        url: url._id,
        ip,
        userAgent,
        referrer
    });

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
});
const getMyUrl = asyncHandler(async(req,res)=>{
    const url = await Url.findById(req.params.id);
    if(!url){
        return res.status(404).json({
            message : "Url Not Found",
        })
    }
    return res.status(200).json({
        url,
    })
})
const updateUrl = asyncHandler(async(req,res)=>{
    const url = await Url.findById(req.params.id);
    if(!url){
        return res.status(404).json({
            message : "Url Not Found",
        })
    }
    if(url.user.toString() !== req.user._id.toString()){
        return res.status(403)
        .json({
            message : "You are not authorized to update this Url"
        })
    }
    const {newUrl} = req.body;
    if (!newUrl) {
        return res.status(400).json({
            message: "New URL is required",
        });
    }
    url.originalUrl = newUrl;
    await url.save();

    return res.status(200).json({
        message: "URL Updated Successfully",
        url,
    });
})
const deleteUrl = asyncHandler(async(req,res)=>{
    const url = await Url.findById(req.params.id);
    if(!url){
        return res.status(404).json({
            message : "Url Not Found",
        })
    }
    if(url.user.toString() !== req.user._id.toString()){
        return res.status(403)
        .json({
            message : "You are not authorized to Delete this Url"
        })
    }
    await url.deleteOne();

    return res.status(200).json({
        message: "The Url is Deleted Successfully",
        url
    });
})
const getMyUrls = asyncHandler(async(req,res)=>{
    const urls = await Url.find({
        user: req.user._id
    });
    return res.status(200).json({
        urls
    });
});
export {createShortUrl,redirectToOriginalUrl,getMyUrl,getMyUrls,updateUrl,deleteUrl};