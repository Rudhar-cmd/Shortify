import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

import { redirectToOriginalUrl } from "./controller/url.controller.js";

const app = express();

app.use(cors({
    origin: "https://shortify11.netlify.app",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "API is Running"
    });
});

app.get("/:shortCode", redirectToOriginalUrl);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/url", urlRouter);
app.use("/api/v1/analytics", analyticsRouter);

export default app;