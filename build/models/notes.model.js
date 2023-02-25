"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteScehema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
    tags: [String],
    body: {
        type: String,
        required: true
    }
});
noteScehema.pre('save', function (next) {
    const note = this;
    note.updatedAt = new Date();
    return next();
});
const Note = (0, mongoose_1.model)('Note', noteScehema);
exports.default = Note;
