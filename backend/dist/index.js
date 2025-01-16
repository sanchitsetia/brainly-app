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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const utilts_1 = require("./utilts");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userNameValidation = zod_1.z.string().min(3).max(10).safeParse(username);
        const passwordValidation = zod_1.z.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).safeParse(password);
        if (!userNameValidation.success || !passwordValidation.success) {
            console.log(userNameValidation.error, passwordValidation.error);
            return res.status(400).json({
                error: "Invalid username or password"
            });
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = new db_1.UserModel({
                username,
                password: hashedPassword
            });
            user.save();
            const token = jsonwebtoken_1.default.sign({ "userid": user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                message: "User created successfully"
            });
        }
    }
    catch (error) {
        console.log("error while signup", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const foundUser = yield db_1.UserModel.findOne({ username });
        if (!foundUser) {
            return res.status(401).json({
                error: "User not found"
            });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ "userid": foundUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: "User logged in successfully"
        });
    }
    catch (error) {
        console.log("error while login", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}));
app.post("/api/v1/content", middleware_1.protectRoutes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, link, type, tags } = req.body;
        // @ts-ignore
        const userId = req.userid;
        yield db_1.ContentModel.create({ title, link, type, tags, userId });
        return res.status(200).json({
            message: "Content created successfully"
        });
    }
    catch (error) {
        console.log("error while creating content", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}));
app.get("/api/v1/content", middleware_1.protectRoutes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield db_1.ContentModel.find().populate("tags").populate("userId", "username");
        return res.status(200).json({
            contents
        });
    }
    catch (error) {
        console.log("error while getting content", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}));
app.delete("/api/v1/content/:id", middleware_1.protectRoutes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.ContentModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Content deleted successfully"
        });
    }
    catch (error) {
        console.log("error while deleting content", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}));
app.post("/api/v1/share", middleware_1.protectRoutes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const share = req.body.share;
        //@ts-ignore
        const userId = req.userid;
        if (share) {
            const existingLink = yield db_1.LinkModel.findOne({ userId });
            const link = "/share/";
            if (existingLink) {
                res.status(200).json({ "link": `${link}${existingLink.hash}` });
            }
            else {
                const createdHash = (0, utilts_1.random)(10);
                console.log("userId", userId);
                yield db_1.LinkModel.create({
                    hash: createdHash,
                    userId
                });
                res.status(200).json({ "link": `${link}${createdHash}` });
            }
        }
        else {
            yield db_1.LinkModel.findOneAndDelete({ userId });
            res.status(200).json({ "message": "share setting removed successfully" });
        }
    }
    catch (error) {
        console.log("error while toggling content share", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}));
app.get("/api/v1/share/:shareId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareId;
        const foundLink = yield db_1.LinkModel.findOne({ hash });
        console.log("foundLink", foundLink);
        if (foundLink) {
            const sharedContent = yield db_1.ContentModel.find({ userId: foundLink.userId }).populate("userId", "username");
            res.status(200).json({ sharedContent });
        }
        else {
            res.status(400).json({ "error": "share link not valid" });
        }
    }
    catch (error) {
        console.log("error while getting the shared content", error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    (0, db_1.connectDB)();
});
