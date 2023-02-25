import express from 'express';
// import { INote } from '../types';

const notesRouter = express.Router()

notesRouter.get('/new', (_req, res) => {
    res.render('note.ejs')
})

export default notesRouter;