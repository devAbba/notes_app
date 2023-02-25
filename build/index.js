"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("./database/mongodb"));
const users_1 = __importDefault(require("./routes/users"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require('dotenv').config();
const port = process.env.PORT;
const mongo_url = process.env.mongo_url;
const SECRET = process.env.SECRET;
const app = (0, express_1.default)();
(0, mongodb_1.default)(mongo_url);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    name: 'user_sid',
    secret: SECRET,
    cookie: { maxAge: 1000 * 60 * 10 },
    resave: false,
    saveUninitialized: true,
    store: new connect_mongo_1.default({ mongoUrl: mongo_url })
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/api', (_req, res) => {
    res.render('login');
    // res.status(200).json({
    //     status: true,
    //     message: 'Welcome'
    // })
});
app.use('/api/users', users_1.default);
app.use('/api/dashboard', authenticate_1.default, dashboard_1.default);
// app.use((error, _req, res, next) => {
//     if (error){
//         console.log(error)
//         errorStatus = error.status || 500
//         res.status(errorStatus).send(error.message)
//         next()
//     }
// })
app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
});
