import React, { useState, useEffect, useRef } from "react";
import Tasks from "./components/Tasks";
import { TaskInterface } from "./interfaces";
import { PlusIcon } from "@heroicons/react/solid";
import { v4 as uuidv4 } from "uuid";
import { LOCAL_STORAGE_TASKS_KEY } from "./constants";
import { TrashIcon } from "@heroicons/react/solid";
import ButtonIcon from "./components/ButtonIcon";

const App = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [task, setTask] = useState<string>("");
  const inputTaskRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
    if (storedTasks === null) return;

    setTasks(JSON.parse(storedTasks));
  }, []);

  const handleClearClick = () => {
    setTasks([...tasks.filter(task => !task.completed)]);
  };

  const handleInputTaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
  };

  const handleAddClick = () => {
    addTask();
  };

  const addTask = () => {
    if (task.trim() === "") return;

    const newTasks = [...tasks, { id: uuidv4(), title: task, completed: false }];
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(newTasks));
    setTasks(newTasks);
    setTask("");

    if (inputTaskRef.current === null) return;
    inputTaskRef.current.focus();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col w-full h-screen max-w-5xl border rounded shadow lg:h-[80vh]">
        <header className="flex items-center justify-between px-3 py-2 border-b border-b-slate-400">
          <h1 className="text-2xl font-semibold">To Do</h1>
          <ButtonIcon
            className="bg-blue-200 border border-blue-900 outline-none hover:bg-blue-800 hover:text-white focus:outline-offset-2 focus:outline-blue-900"
            onClick={handleClearClick}>
            <TrashIcon className="h-5" />Clear
          </ButtonIcon>
        </header>
        <div className="flex-1 px-4 py-2 overflow-y-scroll">
          <Tasks tasks={tasks} setTasks={setTasks} />
        </div>
        <footer className="flex px-3 py-2 space-x-4 border-t border-t-slate-400">
          <input type="text" className="flex-1 transition-colors border-0 border-b-2 outline-none border-b-gray-300 hover:border-b-green-900 focus:border-b-green-900" ref={inputTaskRef} value={task} onChange={e => setTask(e.target.value)} onKeyDown={handleInputTaskKeyDown} />
          <ButtonIcon
            className="bg-green-200 border border-green-900 outline-none hover:bg-green-800 hover:text-white focus:outline-offset-2 focus:outline-green-900"
            onClick={handleAddClick}>
            <PlusIcon className="h-5" />Add
          </ButtonIcon>
        </footer>
      </div>
    </div>
  );
}

export default App;
