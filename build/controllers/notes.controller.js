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
const notes_model_1 = __importDefault(require("../models/notes.model"));
function getUserNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.session.userId;
            const notes = yield notes_model_1.default.find({ _id: id });
            if (!notes) {
                return res.status(404).json({
                    status: false,
                    message: "notes not found"
                });
            }
            res.status(200).json({
                status: true,
                notes: notes
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "error getting Notes"
            });
        }
    });
}
function getNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.param.noteId;
            const note = yield notes_model_1.default.findById({ _id: id });
            if (!note) {
                return res.status(404).json({
                    status: false,
                    message: "notes not found"
                });
            }
            res.status(200).json({
                status: true,
                note: note
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "error getting Note"
            });
        }
    });
}
exports.default = {
    getUserNotes,
    getNote
};
