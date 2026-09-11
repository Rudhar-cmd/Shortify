import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { getUrlAnalytics } from "../controller/analytics.controller.js";

const router = Router();

router.get("/:id", verifyJWT, getUrlAnalytics);

export default router;