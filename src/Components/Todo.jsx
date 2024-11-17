import { useEffect, useRef, useState } from "react";
import { RiTodoLine } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import tick from "../assets/tick.png";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editId, setEditId] = useState(null); // Track which todo is being edited
  const [editText, setEditText] = useState(""); // Text for editing

  const inputRef = useRef();

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todos")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = () => {
    if (!targetValue) return;

    const newTodo = {
      id: Date.now(),
      text: targetValue,
      isComplete: false,
      priority: selectedPriority || "low",
    };

    setTodoList((prev) => [...prev, newTodo]);
    setTargetValue("");
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedFields) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    updateTodo(id, { text: editText });
    setEditId(null);
  };

  const queried = todoList.filter((item) =>
    item.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex justify-evenly">
      {/* -------------------------------First Column---------------------------------- */}
      <div className="bg-white w-11/12 max-w-md flex-col p-7 min-h-[500px] rounded-xl">
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="text"
          placeholder="Add your task"
          ref={inputRef}
          onChange={(e) => setTargetValue(e.target.value)}
        />
        <label htmlFor="priority-task">
          <h1 className="text-lg font-medium">Priority</h1>
        </label>
        <select
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          id="priority-task"
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={addTodo}
          className="border-none rounded-full bg-rose-600 h-16 w-full pl-6 pr-2 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* --------------------------Second Column----------------------------- */}
      <div className="bg-white w-11/12 max-w-md flex-col p-7 min-h-[500px] rounded-xl">
        {/* ----------------------Title------------------------ */}
        <div className="flex items-center mt-7 gap-2">
          <RiTodoLine size={50} />
          <h1 className="text-3xl font-semibold">To-Do List</h1>
        </div>
        <input
          className="flex items-center my-7 bg-gray-200 outline-none h-16 w-full pl-6 pr-2 placeholder:text-slate-600 rounded-full"
          type="text"
          placeholder="search..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div>
          {queried.map((item) => (
            <div className="flex items-center my-3 gap-2" key={item.id}>
              {/* Edit or Display Mode */}
              {editId === item.id ? (
                <input
                  className="flex-1 bg-gray-200 outline-none h-10 rounded-md px-3"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(item.id)}
                  autoFocus
                />
              ) : (
                <div
                  className={`flex flex-1 items-center cursor-pointer ${
                    item.isComplete ? "line-through" : ""
                  }`}
                  onClick={() => updateTodo(item.id, { isComplete: !item.isComplete })}
                >
                  <img className="w-7" src={tick} />
                  <p className="text-slate-700 ml-4 text-[17px]">{item.text}</p>
                </div>
              )}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background:
                    item.priority === "high"
                      ? "red"
                      : item.priority === "medium"
                      ? "orange"
                      : "green",
                }}
              ></div>
              <TiPencil onClick={() => handleEdit(item.id, item.text)} className="cursor-pointer" />
              <FaRegTrashAlt
                onClick={() => deleteTodo(item.id)}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
