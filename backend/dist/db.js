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
exports.connectDB = exports.LinkModel = exports.TagsModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const contentType = ["youtube", "twitter"];
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});
const contentSchema = new mongoose_1.default.Schema({
    title: String,
    link: String,
    type: {
        type: String,
        enum: contentType,
        required: true
    },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tags" }],
    userId: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }],
});
const TagsSchema = new mongoose_1.default.Schema({
    title: String
});
const LinkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
exports.ContentModel = mongoose_1.default.model("Content", contentSchema);
exports.TagsModel = mongoose_1.default.model("Tags", TagsSchema);
exports.LinkModel = mongoose_1.default.model("Link", LinkSchema);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
});
exports.connectDB = connectDB;
