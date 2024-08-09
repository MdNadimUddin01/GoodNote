import express from "express"
import { verifyUser } from "../utils/verifyUser.js";
import {addNote , deleteNote, editNote, getAllNotes, searchNote, updateNotePinned} from "../controller/note.controller.js"

const router = express.Router();

router.post("/add" , verifyUser , addNote);
router.post("/edit/:noteId" , verifyUser , editNote)
router.get("/all" ,verifyUser, getAllNotes);
router.delete("/delete/:noteId", verifyUser , deleteNote )
router.put("/update-note-pinned/:noteId" , verifyUser , updateNotePinned);
router.get("/search" , verifyUser , searchNote);

export default router;