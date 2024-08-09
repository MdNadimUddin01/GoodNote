import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [openEditModel, setAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  if(currentUser === null || !currentUser){
    navigate("/login");
  }

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllnotes();
    }
  }, []);


  

  const getAllnotes = async (req, res) => {
    try {
      const res = await axios.get("http:///localhost:4000/api/note/all", {
        withCredentials: true,
      });

      // if (res.data.success === false) {
      //   console.log(res.data);
      //   return;
      // }

      // console.log(res);

      setAllNotes(res.data.notes);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);

    }
  };

  // getAllnotes();

  const handleEdit = (noteDetails) => {
    setAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
  };

  const deleteNote = async (note) => {
    const noteId = note._id;
    try {
      const res = await axios.delete(
        "http:///localhost:4000/api/note/delete/" + noteId,
        { withCredentials: true }
      );

      // if (res.success === false) {
      //   toast.error(res.data.message);
      // }

      toast.success(res.data.message);

      getAllnotes();
    } catch (error) {

      toast.error(error.response.data.message);

    }
  };

  const updateIsPinned = async (noteData, index) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        "http:///localhost:4000/api/note/update-note-pinned/" + noteId,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );

      // if (res.data.success === false) {
      //   toast.error(error.message);
      //   console.log(error.message);
      //   return;
      // }

      allNotes[index] = res.data.isPinned;

      toast.success(res.data.message);
      getAllnotes();

    } catch (error) {
      // console.log(error.message);
      toast.error(error.response.data.message);

    }
  };

  const handleClearSearch = () => {

    getAllnotes();
    setIsSearch(false);

  };

  const onsearchNote = async (query) => {
    // console.log(query);
    try {
    
      const res = await axios.get('http://localhost:4000/api/note/search', {
        params: {
          query: query
        },
        withCredentials: true
      });

      // console.log(res);

      // if (res.data.success === false) {
      //   console.log(res.data.message);
      //   toast.error(res.data.message);
      //   return;
      // }

      

      setAllNotes(res.data.notes);
      setIsSearch(true);

    } catch (error) {

      toast.error(error.response.data.message);
      
    }
  };

  // console.log(allNotes);

  return (
    <>
      <Navbar
        handleClearSearch={handleClearSearch}
        onsearchNote={onsearchNote}
        userInfo={userInfo}
      ></Navbar>
      <div className="container mx-auto p-6 lg:px-16 md:px-14">
        {allNotes.length === 0 ? (
          <div className="">

            <EmptyCard
              imgSrc={
                isSearch
                  ? "https://w7.pngwing.com/pngs/889/32/png-transparent-page-not-found-illustration-thumbnail.png"
                  : "https://img.freepik.com/free-vector/yellow-note-paper-with-red-pin_1284-42430.jpg?w=900&t=st=1723032648~exp=1723033248~hmac=680f17e4f695c4103c94485dce97cfd5b1a254a3f8ec7d38e16cfc2423ffeb79"
              }
              message={
                isSearch
                  ? "Oops! No Notes Found matching your search"
                  : "Ready to capture your ideas ? Click the 'Add' button to start noting down your thoughts , inspiration and reminders . Let's go started"
              }
            ></EmptyCard>

          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5 ">
            {allNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.date}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => {
                  handleEdit(note);
                }}
                onDelete={() => {
                  deleteNote(note);
                }}
                onPinNote={() => {
                  updateIsPinned(note, index);
                }}
              ></NoteCard>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setAddEditModel({ isShown: true, type: "add", data: null });
        }}
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10"
      >
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>

      <Modal
        isOpen={openEditModel.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onclose={() =>
            setAddEditModel({ isShown: false, type: "add", date: null })
          }
          noteData={openEditModel.data}
          type={openEditModel.type}
          fetch={() => {getAllnotes()}}
        ></AddEditNotes>
      </Modal>
    </>
  );
};

export default Home;
