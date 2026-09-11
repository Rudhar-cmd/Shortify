import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    changePassword,
    updateDetails
} from "../controller/user.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", verifyJWT, logoutUser);

router.get("/current-user", verifyJWT, currentUser);

router.patch("/change-password", verifyJWT, changePassword);

router.patch("/update-details", verifyJWT, updateDetails);

export default router;