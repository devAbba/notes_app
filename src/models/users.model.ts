import { Schema, model } from "mongoose";
import { IUser } from '../types';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>({
    first_name: String,
    last_name: String,
    user_name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(this: IUser, next) {
    const user: any = this;

    if (!user.isModified('password')){
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10) 
    this.password = hash
    next()
})

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = model<IUser>('User', userSchema)

export default User