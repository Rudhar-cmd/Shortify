import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";

import {
    createShortUrl,
    redirectToOriginalUrl,
    getMyUrl,
    getMyUrls,
    updateUrl,
    deleteUrl
} from "../controller/url.controller.js";

const router = Router();


router.post("/shorten", verifyJWT, createShortUrl);


router.get("/my-urls", verifyJWT, getMyUrls);


router.get("/:id", verifyJWT, getMyUrl);


router.patch("/:id", verifyJWT, updateUrl);


router.delete("/:id", verifyJWT, deleteUrl);


router.get("/redirect/:shortCode", redirectToOriginalUrl);

export default router;