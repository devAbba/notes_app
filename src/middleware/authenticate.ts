import User from '../models/users.model';

async function authenticate (req: any, res: any, next: any): Promise<void>{
    if (!(req.session.userId)){
        return res.status(401).send('unauthorized')
    }

    req.user = await User.findById({_id: req.session.userId})

    if (!req.user){
        return res.status(401).json({
            status: false,
            message: "unauthorized!"
        })
        
    }
    next()
    
}

export default authenticate
