"use strict";
exports.__esModule = true;
var express_1 = require("express");
var blogController_js_1 = require("../controllers/blogController.js");
var userController_js_1 = require("../controllers/userController.js");
var publicRouter = express_1["default"].Router();
publicRouter.get("/get-paginated-blogs", blogController_js_1.gethomePageBlogs);
publicRouter.get("/get-user-list", userController_js_1.getPaginatedUsers);
exports["default"] = publicRouter;
