import moment from "moment";
import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
const NoteCard = ({
  isPinned,
  onDelete,
  title,
  date,
  onPinNote,
  content,
  onEdit,
  tags,
}) => {
  // console.log()
  // console.log("isPinned :- ", isPinned);
  return (
    <div>
      <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-green-700">
              {moment(date).format("Do MMM YYYY")}
            </span>
          </div>

          <MdOutlinePushPin
            onClick={onPinNote}
            className={`cursor-pointer text-xl ${
              isPinned ? "text-blue-500" : "text-slate-300"
            } hover:text-blue-500`}
          />

          {/* <MdOutlinePushPin
            onClick={onPinNote}
            className={`cursor-pointer text-xl text-slate-300 cursor ${
              isPinned ? "text-blue-500" : "text-slate-300"
            } hover:text-blue-500`}
          ></MdOutlinePushPin> */}

          {/* <div></div> */}
        </div>

        <p className="text-xs text-slate-600 mt-2">{content}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">
            {
              tags.map((item) => `#${item} `)
            }
            </div>

          <div className="flex items-center gap-2">
            <MdCreate
              onClick={onEdit}
              className="cursor-pointer text-xl text-slate-300 cursor hover:text-green-600"
            ></MdCreate>

            <MdDelete
              onClick={onDelete}
              className="cursor-pointer text-xl text-slate-300 cursor hover:text-red-700"
            ></MdDelete>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
