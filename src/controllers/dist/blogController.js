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
exports.getMyBlogs = exports.gethomePageBlogs = exports.getUserBlogs = exports.getBlog = exports.deleteBlog = exports.updateBlog = exports.createBlog = void 0;
var client_1 = require("@prisma/client");
var blogSchemas_js_1 = require("../schemas/blogSchemas.js");
var lodash_1 = require("lodash");
var errorHandler_js_1 = require("../utils/errorHandler.js");
var prisma = new client_1.PrismaClient();
var createBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, title, description, content, tags, newBlog, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = res.userId;
                _a = blogSchemas_js_1.createBlogSchema.parse(req.body), title = _a.title, description = _a.description, content = _a.content, tags = _a.tags;
                return [4 /*yield*/, prisma.blog.create({
                        data: {
                            title: title,
                            description: description,
                            content: content,
                            tags: tags,
                            userId: userId
                        }
                    })];
            case 1:
                newBlog = _b.sent();
                return [2 /*return*/, res.json({ error: null, data: newBlog })];
            case 2:
                error_1 = _b.sent();
                errorHandler_js_1["default"](res, error_1, "Error while creating blog");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createBlog = createBlog;
var updateBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, content, tags, id, updatedData, updatedBlog, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = blogSchemas_js_1.updateBlogSchema.parse(req.body), title = _a.title, description = _a.description, content = _a.content, tags = _a.tags;
                id = blogSchemas_js_1.blogQuerySchema.parse(req.params).id;
                updatedData = lodash_1["default"].pick(req.body, [
                    "title",
                    "description",
                    "content",
                    "tags",
                ]);
                return [4 /*yield*/, prisma.blog.update({
                        where: {
                            id: id
                        },
                        data: __assign({}, updatedData)
                    })];
            case 1:
                updatedBlog = _b.sent();
                return [2 /*return*/, res.json({ error: null, data: updatedBlog })];
            case 2:
                error_2 = _b.sent();
                errorHandler_js_1["default"](res, error_2, "Error while updating blog");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateBlog = updateBlog;
var deleteBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedBlog, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = blogSchemas_js_1.blogQuerySchema.parse(req.params).id;
                return [4 /*yield*/, prisma.blog["delete"]({
                        where: {
                            id: id
                        }
                    })];
            case 1:
                deletedBlog = _a.sent();
                return [2 /*return*/, res.json({ error: null, data: deletedBlog })];
            case 2:
                error_3 = _a.sent();
                errorHandler_js_1["default"](res, error_3, "Error while deleting blog");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteBlog = deleteBlog;
var getBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, returnedBlog, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = blogSchemas_js_1.blogQuerySchema.parse(req.params).id;
                return [4 /*yield*/, prisma.blog.findUnique({
                        where: {
                            id: id
                        }
                    })];
            case 1:
                returnedBlog = _a.sent();
                return [2 /*return*/, res.json({ error: null, data: returnedBlog })];
            case 2:
                error_4 = _a.sent();
                errorHandler_js_1["default"](res, error_4, "Error while retrieving blog");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBlog = getBlog;
var getUserBlogs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fetchedBlogs, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = blogSchemas_js_1.blogQuerySchema.parse(req.params).id;
                return [4 /*yield*/, prisma.blog.findMany({
                        where: {
                            userId: id
                        },
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            createdOn: true,
                            tags: true,
                            userId: true,
                            content: false,
                            user: false
                        }
                    })];
            case 1:
                fetchedBlogs = _a.sent();
                return [2 /*return*/, res.json({ error: null, data: fetchedBlogs })];
            case 2:
                error_5 = _a.sent();
                errorHandler_js_1["default"](res, error_5, "Error while retrieving user's blog");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserBlogs = getUserBlogs;
var getMyBlogs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, pageNumber, blogsPerPage, offset, userBlogs, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = res.userId;
                pageNumber = parseInt(req.query.pageNumber) || 1;
                blogsPerPage = parseInt(req.query.blogsPerPage) || 4;
                offset = (pageNumber - 1) * blogsPerPage;
                return [4 /*yield*/, prisma.blog.findMany({
                        where: {
                            userId: userId
                        },
                        skip: offset,
                        take: blogsPerPage
                    })];
            case 1:
                userBlogs = _a.sent();
                res.json({ error: null, data: userBlogs });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                errorHandler_js_1["default"](res, error_6, "Error while retrieving blogs");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMyBlogs = getMyBlogs;
var gethomePageBlogs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, blogsPerPage, offset, blogs, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pageNumber = parseInt(req.query.pageNumber) || 1;
                blogsPerPage = parseInt(req.query.blogsPerPage) || 4;
                offset = (pageNumber - 1) * blogsPerPage;
                return [4 /*yield*/, prisma.blog.findMany({
                        skip: offset,
                        take: blogsPerPage
                    })];
            case 1:
                blogs = _a.sent();
                return [2 /*return*/, res.json({ error: null, data: blogs })];
            case 2:
                error_7 = _a.sent();
                errorHandler_js_1["default"](res, error_7, "Error while retrieving blogs");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.gethomePageBlogs = gethomePageBlogs;
