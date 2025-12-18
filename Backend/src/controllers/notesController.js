import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getting all notes ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNotesById(req, res) {
  try {
    const notes = await Note.findById(req.params.id);
    if (!notes) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in gettingnote by id ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in creating notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updating notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    console.error("Error in deleting notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
