"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var client_1 = require("@prisma/client");
dotenv_1["default"].config();
var app = express_1["default"]();
var prisma = new client_1.PrismaClient();
app.use(express_1["default"].json());
app.get("/", function (req, res) {
    res.json({ message: "Hello World" });
});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3300");
    console.log(process.env.PORT);
});
