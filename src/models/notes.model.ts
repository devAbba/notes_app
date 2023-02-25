import { Schema, model } from 'mongoose';
import { INote } from '../types';

const noteScehema = new Schema<INote>({
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
})

noteScehema.pre('save', function (this: INote, next){
    const note = this;
    note.updatedAt = new Date()
    return next()
})

const Note = model<INote>('Note', noteScehema)

export default Note;