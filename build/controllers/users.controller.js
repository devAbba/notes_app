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
const users_model_1 = __importDefault(require("../models/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { first_name, last_name, user_name, email, password } = req.body;
            const newUser = new users_model_1.default({
                first_name,
                last_name,
                user_name,
                email,
                password
            });
            yield newUser.save();
            res.status(201).json({
                status: true,
                user: newUser
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield users_model_1.default.findOne({ 'email': email });
            const userMatch = user === null ? false : yield bcrypt_1.default.compare(password, user.password);
            if (!(user && userMatch)) {
                return res.status(401).json({
                    message: "invalid username/password"
                });
            }
            req.session.userId = user.id;
            res.json({
                status: true,
                message: "successfully logged in"
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "unexpected error"
            });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            delete req.session.userId;
            res.json({
                status: true,
                message: "successfully logged out"
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "unexpected error"
            });
        }
    });
}
exports.default = {
    createUser,
    loginUser,
    logout
};
