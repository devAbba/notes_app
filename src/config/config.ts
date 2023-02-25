import MongoStore from "connect-mongo";
require('dotenv').config()

const mongo_url = process.env.mongo_url
const SECRET = process.env.SECRET

const config = {
    session_config: {
        name: 'user_sid',
        secret: SECRET,
        cookie: { maxAge: 1000 * 60 * 10},
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongoUrl: mongo_url})
    }


}

export default config;