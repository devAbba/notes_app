import Note from "../models/notes.model"


async function getUserNotes (req: any, res: any): Promise<void>{
    try {
        const id = req.session.userId
        const notes = await Note.find({_id: id})
        if (!notes){
            return res.status(404).json({
                status: false,
                message: "notes not found"
            })
        }
        res.status(200).json({
            status: true,
            notes: notes
        })
    } 
    catch (error){
        console.log(error)
        res.status(500).json({
            message: "error getting Notes"
        })
    }
}

async function getNote (req: any, res: any): Promise<void>{
    try {
        const id = req.param.noteId
        const note = await Note.findById({_id: id})
        if (!note){
            return res.status(404).json({
                status: false,
                message: "notes not found"
            })
        }
        res.status(200).json({
            status: true,
            note: note
        })
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            message: "error getting Note"
        })
    }
}

export default {
    getUserNotes, 
    getNote
};