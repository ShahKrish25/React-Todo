"use client";
import React, { useState, useEffect, useRef } from "react";
import Nav from "@/Components/Nav";
import SnowEffect from "@/Components/SnowEffect";
const Page = () => {
  const [name, setName] = useState("")
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mainTasks, setMainTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (mainTasks.includes(inputValue.trim())) {
      alert("Task already exists!");
      return;
    }
    if (inputValue.trim() === "") {
      alert("Please enter a task before adding!");
      return;
    }
    setMainTasks([...mainTasks, inputValue])
    setInputValue("");
  }
  const delete_task = (index) => {
    // const new_tasks = mainTasks.filter((task, i) => i !== index);
    const ref = [...mainTasks];
    ref.splice(index, 1);
    setMainTasks(ref);
  };
  const edit_task = (index) => {
    setEditIndex(index);
    setEditedValue(mainTasks[index]);
  }

  const save_task = (index) => {
    if (editedValue.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }
    const updatedTasks = [...mainTasks];
    updatedTasks[index] = editedValue;
    setMainTasks(updatedTasks);
    setEditIndex(null);
    setEditedValue("");
  };

  const editInputRef = useRef(null);

useEffect(() => {
  if (editInputRef.current) {
    editInputRef.current.focus();
  }
}, [editIndex]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("userName");
      const savedTasks = localStorage.getItem("mainTasks");
      if (savedName) {
        setName(savedName);
      } else {
        const enteredName = prompt("Enter your name");
        const finalName = enteredName && enteredName.trim() !== "" ? enteredName : "User";
        localStorage.setItem("userName", finalName);
        setName(finalName);
      }
      if (savedTasks) {
        setMainTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mainTasks", JSON.stringify(mainTasks));
    }
  }, [mainTasks]);
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <div className="min-h-screen flex flex-col">
        <Nav name={name} />
        <SnowEffect />
        <div className="bg-zinc-900 flex justify-center items-center flex-grow">
          <div className="bg-white min-w-1/2  rounded-2xl p-4">
            <div className="flex justify-between items-center p-4.5">
              <h1 className="text-2xl text-gray-600 font-semibold">
                Todo List
              </h1>
              <button
                className="bg-amber-200 px-4 py-2 rounded-md hover:bg-amber-300 hover:scale-95 duration-100"
                onClick={() => setShowInput(!showInput)}
              >
                Add Task <i className="ri-gemini-fill"></i>
              </button>
            </div>
            <div
              className={`p-4 overflow-hidden transition-all duration-300 ${showInput ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
                }`}
            >
              <form className="add_task_form" onSubmit={submit}>
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter your task"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md items-center w-[100%] input"
                  />
                  <button className="bg-amber-200 px-4 py-1 rounded-md hover:bg-amber-300 hover:scale-95 duration-100">
                    <i className="ri-add-fill text-2xl"></i>
                  </button>
                </div>
              </form>
              {/* show the tasks */}
              <div className="tasks  max-h-60 overflow-y-auto mt-4">
                {mainTasks.map((task, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-4 my-2 rounded-md flex justify-between items-center"
                  >
                    {editIndex === index ? (
                      <input
                        type="text"
                        ref={editInputRef}
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        className="border px-2 py-1 rounded-md w-[300px]"
                      />
                    ) : (
                      <p className="text-gray-600">{task}</p>
                    )}

                    <div className="flex gap-2">
                      {editIndex === index ? (
                        <>
                          <button
                            className="bg-green-300 px-2 py-1 rounded-md hover:bg-green-400 hover:scale-95 duration-200"
                            onClick={() => save_task(index)}
                          >
                            <i className="ri-check-fill text-xl"></i>
                          </button>
                          <button
                            className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 hover:scale-95 duration-200"
                            onClick={() => {
                              setEditIndex(null);
                              setEditedValue("");
                            }}
                          >
                            <i className="ri-close-fill text-xl"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-yellow-300 px-2 py-1 rounded-md hover:bg-yellow-400 hover:scale-95 duration-200"
                            onClick={() => edit_task(index)}
                          >
                            <i className="ri-pencil-fill text-xl"></i>
                          </button>
                          <button
                            className="bg-red-300 px-2 py-1 rounded-md hover:bg-red-400 hover:scale-95 duration-200"
                            onClick={() => delete_task(index)}
                          >
                            <i className="ri-delete-bin-fill text-xl"></i>
                          </button>
                        </>
                      )}

                    </div>
                  </div>
                ))}
              </div>

            </div>
            {mainTasks.length === 0 && showInput ? <> <div className="flex justify-center  items-center gap-1.5 duration-200 "> <i className="ri-gemini-fill"></i> <p className="text-gray-600 text-center ">No tasks found</p> <i className="ri-gemini-fill"></i> </div></> : ''}
            {mainTasks.length != 0 ? <p className="text-red-400 text-center">YOU HAVE {mainTasks.length > 0 && mainTasks.length == 1 ? mainTasks.length + " TASK LEFT" : mainTasks.length + " TASKS LEFT"} </p> : ''}
            { }
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
