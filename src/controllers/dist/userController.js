"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getPaginatedUsers = exports.getUser = exports.updateUser = void 0;
var client_1 = require("@prisma/client");
var userSchema_js_1 = require("../schemas/userSchema.js");
var lodash_1 = require("lodash");
var errorHandler_js_1 = require("../utils/errorHandler.js");
var prisma = new client_1.PrismaClient();
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, name, updatedData, updatedUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = res.userId;
                name = userSchema_js_1.updateUserRequestSchema.parse(req.body).name;
                updatedData = lodash_1["default"].pick(req.body, ["name", "profileUrl"]);
                return [4 /*yield*/, prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: __assign({}, updatedData)
                    })];
            case 1:
                updatedUser = _a.sent();
                return [2 /*return*/, res.json({ error: null, data: updatedUser })];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                errorHandler_js_1["default"](res, error_1, "Error while fetching User Data");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userDetails, blogCount, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log("triggered");
                id = userSchema_js_1.userQuerySchema.parse(req.params).id;
                console.log(id);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            id: id
                        },
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            profileUrl: true,
                            password: false,
                            blogs: {
                                select: {
                                    id: true,
                                    title: true,
                                    description: true,
                                    createdOn: true,
                                    tags: true
                                }
                            }
                        }
                    })];
            case 1:
                userDetails = _b.sent();
                blogCount = (_a = userDetails === null || userDetails === void 0 ? void 0 : userDetails.blogs.length) !== null && _a !== void 0 ? _a : 0;
                return [2 /*return*/, res.json({ error: null, data: __assign(__assign({}, userDetails), { blogCount: blogCount }) })];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                errorHandler_js_1["default"](res, error_2, "Error while fetching User Data");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var getPaginatedUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, blogsPerPage, offset, users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pageNumber = parseInt(req.query.pageNumber) || 1;
                blogsPerPage = parseInt(req.query.blogsPerPage) || 4;
                offset = (pageNumber - 1) * blogsPerPage;
                return [4 /*yield*/, prisma.user.findMany({
                        skip: offset,
                        take: blogsPerPage,
                        select: {
                            name: true,
                            profileUrl: true,
                            id: true,
                            email: true,
                            blogs: {
                                select: {
                                    id: true
                                }
                            }
                        }
                    })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json({ error: null, data: users })];
            case 2:
                error_3 = _a.sent();
                errorHandler_js_1["default"](res, error_3, "Error while retrieving blogs");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPaginatedUsers = getPaginatedUsers;
