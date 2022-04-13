import { SetStateAction, useState } from "react";
import { LOCAL_STORAGE_TASKS_KEY } from "../constants";
import { TaskInterface } from "../interfaces";

type TaskProps = {
  tasks: TaskInterface[],
  task: TaskInterface,
  setTasks: React.Dispatch<SetStateAction<TaskInterface[]>>,
};

const Task = ({ tasks, task, setTasks }: TaskProps) => {
  const handleCheckedChange = () => {
    const currenTaskIndex: number = tasks.findIndex(t => t.id === task.id);
    const newTasks: TaskInterface[] = [...tasks.slice(0, currenTaskIndex), {
      id: task.id,
      title: task.title,
      completed: !task.completed,
    }, ...tasks.slice(currenTaskIndex + 1)];
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  return (
    <li className="flex items-start py-2 space-x-2 transition-colors border-b cursor-pointer border-b-slate-200 hover:bg-slate-50" onClick={handleCheckedChange}>
      <input className="mt-2" type="checkbox" checked={task.completed} readOnly />
      <span className={`${task.completed ? "line-through" : ""}`}>{task.title}</span>
    </li>
  );
};

export default Task;