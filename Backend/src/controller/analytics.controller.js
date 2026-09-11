import asyncHandler from "../utils/asyncHandler.js";
import { Url } from "../models/url.models.js";
import { Click } from "../models/click.models.js";

const getUrlAnalytics = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const url = await Url.findById(id);

    if (!url) {
        return res.status(404).json({
            message: "URL Not Found"
        });
    }

    if (url.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized to view analytics"
        });
    }

    const clicks = await Click.find({
        url: url._id
    }).sort({ clickedAt: -1 });

    return res.status(200).json({
        message: "Analytics Fetched Successfully",
        totalClicks: url.clicks,
        clicks
    });
});

export { getUrlAnalytics };