"use strict";
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
exports.logUserIn = exports.signUserUp = void 0;
var client_1 = require("@prisma/client");
var errorHandler_js_1 = require("../utils/errorHandler.js");
var bcryptUtils_js_1 = require("../utils/bcryptUtils.js");
var authSchema_js_1 = require("../schemas/authSchema.js");
var jwtUtils_js_1 = require("../utils/jwtUtils.js");
var prisma = new client_1.PrismaClient();
var signUserUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, profileUrl, encryptedPass, createdUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                console.log("req", req.body);
                _a = authSchema_js_1.signUpSchema.parse(req.body), email = _a.email, password = _a.password, username = _a.username, profileUrl = _a.profileUrl;
                return [4 /*yield*/, bcryptUtils_js_1.encryptPassowrd(password)];
            case 1:
                encryptedPass = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: email,
                            name: username,
                            password: encryptedPass,
                            profileUrl: profileUrl
                        }
                    })];
            case 2:
                createdUser = _b.sent();
                // return res.redirect("/login");
                return [2 /*return*/, res.json({ success: true })];
            case 3:
                error_1 = _b.sent();
                errorHandler_js_1["default"](res, error_1, "Trouble Signing User In");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signUserUp = signUserUp;
var logUserIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, loggedUser, isPasswordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                console.log("req", req.body);
                _a = authSchema_js_1.loginSchema.parse(req.body), email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            email: email
                        }
                    })];
            case 1:
                loggedUser = _b.sent();
                if (!loggedUser) {
                    return [2 /*return*/, res.json({
                            error: "User Not Found",
                            user: { found: false, token: null, userId: null }
                        })];
                }
                return [4 /*yield*/, bcryptUtils_js_1.comparePasswords(password, loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.password)];
            case 2:
                isPasswordMatch = _b.sent();
                if (!isPasswordMatch) {
                    return [2 /*return*/, res.json({
                            error: "Invalid password",
                            user: { found: false, token: null, userId: null }
                        })];
                }
                token = jwtUtils_js_1.generateAccessToken(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.email, loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id);
                res.json({
                    error: null,
                    user: { found: true, token: token, userId: loggedUser.id }
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                errorHandler_js_1["default"](res, error_2, "Trouble Logging User In");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logUserIn = logUserIn;
