"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const usersRouter = express_1.default.Router();
usersRouter.get('/signup', (_req, res) => {
    res.render('signup');
});
usersRouter.get('/login', (_req, res) => {
    res.render('login');
});
usersRouter.post('/signup', users_controller_1.default.createUser);
usersRouter.post('/login', users_controller_1.default.loginUser);
usersRouter.post('/logout', authenticate_1.default, users_controller_1.default.logout);
exports.default = usersRouter;
