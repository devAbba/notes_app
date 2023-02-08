"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongo_url = process.env.mongo_url;
const sessionConfig = {
    secret: 'secreeeet',
    cookie: { maxAge: 3000 },
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: mongo_url, collectionName: 'sessions' })
};
exports.default = sessionConfig;
