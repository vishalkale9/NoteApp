import Note from "../models/Note.js";

//create a new note     
export const createNote = async (req,res)=>{
    try {
        const {title,content} = req.body;   
        const note = await Note.create({title,content,user:req.user.id});
        res.status(201).json({message:"Note created successfully",note});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

//get all notes of the user
export const getNotes = async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.status(200).json({message:"Notes fetched successfully",notes});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

//update a note
export const updateNote = async (req,res)=>{
    try {
        const {id} = req.params;
        const {title,content} = req.body;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({message:"Note not found"});
        }   
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({message:"Unauthorized"});
        }   
        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();
        res.status(200).json({message:"Note updated successfully",note});
    }   
    catch (error) {
        res.status(500).json({message:error.message});
    }
};

//delete a note 
export const deleteNote = async (req,res)=>{
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({message:"Note not found"});
        }   
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({message:"Unauthorized"});
        }   
        await note.deleteOne();
        res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
