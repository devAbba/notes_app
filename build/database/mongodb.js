"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (url) => {
    mongoose_1.default.connect(url);
    mongoose_1.default.connection.on("connected", () => {
        console.log("connected to mongodb successfully");
    });
    mongoose_1.default.connection.on("error", (error) => {
        console.log("there was a problem connecting to mongodb");
        console.log(error);
    });
};
exports.default = connectDB;
