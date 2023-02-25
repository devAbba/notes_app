import express from 'express';
import noteController from '../controllers/notes.controller';

const dbRouter = express.Router();

dbRouter.get('/', noteController.getUserNotes)

dbRouter.get('/:noteId', noteController.getNote);


export default dbRouter;