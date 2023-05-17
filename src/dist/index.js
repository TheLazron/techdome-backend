"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var client_1 = require("@prisma/client");
var blogRouter_js_1 = require("./routers/blogRouter.js");
var authRouter_js_1 = require("./routers/authRouter.js");
var jwtUtils_js_1 = require("./utils/jwtUtils.js");
var userRouter_js_1 = require("./routers/userRouter.js");
var publicRouter_js_1 = require("./routers/publicRouter.js");
dotenv_1["default"].config();
var app = express_1["default"]();
var prisma = new client_1.PrismaClient();
app.use(cors_1["default"]());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
//function to Verify JWT
var verifyToken = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        console.log("provide token");
        return res
            .status(401)
            .json({ message: "Provide with a valid authentication token" });
    }
    jwtUtils_js_1.verifyJWT(token, res, next);
};
app.use(publicRouter_js_1["default"]);
app.use(authRouter_js_1["default"]);
app.use("/", verifyToken);
app.use(userRouter_js_1["default"]);
app.use(blogRouter_js_1["default"]);
app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3300");
    console.log(process.env.PORT);
});
