"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = __importDefault(require("../controllers/notes.controller"));
const dbRouter = express_1.default.Router();
dbRouter.get('/', notes_controller_1.default.getUserNotes);
dbRouter.get('/:noteId', notes_controller_1.default.getNote);
exports.default = dbRouter;
