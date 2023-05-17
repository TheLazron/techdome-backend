"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userController_js_1 = require("../controllers/userController.js");
var userRouter = express_1["default"].Router();
userRouter.post("/update-user/", userController_js_1.updateUser);
userRouter.get("/get-user/:id", userController_js_1.getUser);
// userRouter.get("/get-user-list/", getPaginatedUsers);
exports["default"] = userRouter;
