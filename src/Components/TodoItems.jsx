import tick from "../assets/tick.png";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { useState } from "react";

const TodoItems = ({ text, id, isComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEditSave = () => {
    if (editText.trim()) {
      updateTodo(id, { text: editText });
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center my-3 gap-2">
      {/* Checkbox and Text */}
      <div
        className={`flex flex-1 items-center cursor-pointer ${
          isComplete ? "line-through text-gray-400" : "text-slate-700"
        }`}
        onClick={() => updateTodo(id, { isComplete: !isComplete })}
      >
        <img className="w-7" src={tick} />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSave();
            }}
            className="ml-4 text-[17px] bg-gray-200 outline-none rounded px-2"
            autoFocus
          />
        ) : (
          <p className="ml-4 text-[17px]">{text}</p>
        )}
      </div>

      {/* Edit Icon */}
      <TiPencil
        onClick={() => setIsEditing(true)}
        className="w-4 h-4 text-blue-500 cursor-pointer"
      />

      {/* Delete Icon */}
      <FaRegTrashAlt
        onClick={() => deleteTodo(id)}
        className="w-3.5 cursor-pointer text-red-500"
      />
    </div>
  );
};

export default TodoItems;

