import express from 'express';
import connectDB from './database/mongodb';
import usersRouter from './routes/users';
import dbRouter from './routes/dashboard';
import session from 'express-session';
import path from 'path';
import authenticate from './middleware/authenticate';
import MongoStore from 'connect-mongo';
import notesRouter from './routes/notes';
require('dotenv').config()

const port = process.env.PORT
const mongo_url = process.env.mongo_url

const app = express();

connectDB(mongo_url);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    name: 'user_sid',
    secret: 'SECRET',
    cookie: { maxAge: 1000 * 60 * 10},
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: mongo_url})
}));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/api', (_req, res) => {
    res.render('login')
    // res.status(200).json({
    //     status: true,
    //     message: 'Welcome'
    // })
})

app.use('/api/users', usersRouter)
app.use('/api/dashboard', authenticate, dbRouter)
app.use('/api/note/', notesRouter)

app.use((error: any, _req: any, res: any, next: any) => {
    if (error){
        console.log(error)
        const errorStatus = error.status || 500
        res.status(errorStatus).send(error.message)
        next()
    }

})

app.listen(port, () => {
    console.log(`server is listening on port: ${port}`)
})


