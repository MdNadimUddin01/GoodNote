import Note from "../model/note.model.js";
import { errorHandle } from "../utils/error.js";

export const addNote = async (req, res, next) => {
  const { title, content, tags } = req.body;

  const { id } = req.user;

  if (!title) {
    next(errorHandle(400, "Title is required"));
  }

  if (!content) {
    next(errorHandle(400, "Content is required"));
  }

  try {
    const note = new Note({ title, content, tags, userId: id });

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note added SuccessFully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const editNote = async (req, res, next) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(errorHandle(404, "Note not found"));
  }

  if (req.user.id !== note.userId) {
    return next(errorHandle(401, "You can only update your own Note"));
  }

  const { title, content, tags, isPinned } = req.body;

  if (!title && !content && !tags) {
    return next(errorHandle(404, "No changes provided"));
  }

  try {
    if (title) {
      note.title = title;
    }

    if (content) {
      note.content = content;
    }

    if (tags) {
      note.tags = tags;
    }

    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });

    res.status(200).json({
      success: true,
      message: "All notes retrived successfully",
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;

  const note = await Note.findOne({ _id: noteId, userId: req.user.id });

  if (!note) {
    return next(errorHandle(404, "Note not Found"));
  }

  try {
    await Note.deleteOne({ _id: noteId, userId: req.user.id });

    res.status(200).json({
      success: true,
      message: "Note deleted SuccessFully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateNotePinned = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return next(errorHandle(404, "Note not found"));
    }

    if (req.user.id !== note.userId) {
      return next(errorHandle(401, "You can only update your own"));
    }

    const { isPinned } = req.body;

    note.isPinned = isPinned;

    await note.save();

    res.status(200).json({
      success: true,
      message: note.isPinned ? "Note Pinned SuccessFully" : "Note UnPinned SuccessFully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const searchNote = async (req, res, next) => {
  const { query } = req.query;
  // console.log(query);
  // console.log(req.query);

  if (!query) {
    return next(errorHandle(400, "Search query is required"));
  }

  

  try {
    
    const matchingNotes = await Note.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    // console.log(matchingNotes);

    res.status(200).json({
      success:true,
      message: "Note matching the search query retrived successfully",
      notes:matchingNotes,
    })
  } catch (error) {}
};
