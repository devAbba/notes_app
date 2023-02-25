import express from 'express';
import usersController from '../controllers/users.controller';
import authenticate from '../middleware/authenticate';

const usersRouter = express.Router()

usersRouter.get('/signup', (_req, res) => {
    res.render('signup')
})

usersRouter.get('/login', (_req, res) => {
    res.render('login')
})

usersRouter.post('/signup', usersController.createUser)

usersRouter.post('/login', usersController.loginUser)

usersRouter.post('/logout', authenticate, usersController.logout)

export default usersRouter