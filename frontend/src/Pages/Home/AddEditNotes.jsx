import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/input/TagInput";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";

const AddEditNotes = ({ onclose, noteData, type ,fetch}) => {

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  const editNote = async () => {

    const noteId = noteData._id;

    try{

      const res = await axios.post("https://goodnote.onrender.com/api/note/edit/" + noteId , {title , tags , content} , {withCredentials:true});

      // if(res.data.success === false){
      //   toast.failure(res.data.message);
      //   // toast.error(res.data.message);
      //   console.log(res.data.message);
      //   setError(res.data.message);
      //   return;
      // }

      
      fetch();

      toast.success(res.data.message);
      // toast.success(res.data.message);

      onclose();

    }catch(error){

      toast.error(error.response.data.message);
      // console.log(error.message);
      setError(error.response.data.message);
      
    }
  };

  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http:///localhost:4000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      // if (res.data.success === false) {
      //   console.log(res.data.error.message);
      //   setError(res.data.error.message);
      // }

      toast.success(res.data.message);

      fetch();
      onclose();
    } catch (error) {

      toast.error(error.response.data.message);
      setError(error.response.data.message);
      
    }
  };
  const handleAddNote = () => {
    if (!title) {
      setError("Please Enter the title");
      return;
    }
    if (!content) {
      setError("Please Enter the content");
      return;
    }

    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        onClick={onclose}
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
      >
        <MdClose className="text-xl text-slate-400"></MdClose>
      </button>

      {/* title */}

      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 uppercase">Title</label>
        <input
          type="text"
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          className="text-2xl text-slate-950 outline-none"
          placeholder="Enter The Title"
          value={title}
        />
      </div>

      {/* content */}

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs text-slate-400 uppercase">Content</label>
        <textarea
          placeholder="Content..."
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          type="text"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>

      {/*  */}

      <div className="">
        <label className="text-xs text-red-400 uppercase">tags</label>

        {/* TagInput */}
        <TagInput tags={tags} setTag={setTags}></TagInput>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="w-full text-sm bg-[#2B85FF] text-white rounded my-1 hover:bg-blue-70 text-[2B85FF] font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
