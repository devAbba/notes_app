import User from '../models/users.model';
import { IUser } from '../types';
import bcrypt from 'bcrypt';


async function createUser (req: any, res: any, next: any): Promise<void>{
    try {
        const { first_name, last_name, user_name, email, password } = req.body
        const newUser = new User({
            first_name,
            last_name,
            user_name,
            email,
            password
        })
        await newUser.save()
        res.status(201).json({
            status: true,
            user: newUser
        })
    }
    catch (error){
        next(error)
    }
    
}

async function loginUser (req: any, res: any): Promise<void>{
    try {
        const { email, password } = req.body
        const user: IUser | null = await User.findOne({'email': email})
        const userMatch = user === null ? false : await bcrypt.compare(password, user.password)
        if (!(user && userMatch)){
        return res.status(401).json({
                message: "invalid username/password"
            })
        }
        
        req.session.userId = user.id

        res.json({
            status: true,
            message: "successfully logged in"
        })
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            message: "unexpected error"
        })
    }
    

}

async function logout (req: any, res: any){
    try {
        delete req.session.userId

        res.json({
            status: true,
            message: "successfully logged out"
        })
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            message: "unexpected error"
        })
    }
    
}



export default {
    createUser,
    loginUser,
    logout
}