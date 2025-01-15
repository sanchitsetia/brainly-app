"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoutes = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protectRoutes = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const validToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!validToken) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }
        // @ts-ignore
        req.userid = validToken.userid;
        next();
    }
    catch (error) {
        console.log("error while verifying token", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
exports.protectRoutes = protectRoutes;
