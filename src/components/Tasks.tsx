import { SetStateAction } from "react";
import { TaskInterface } from "../interfaces";
import Task from "./Task";

type TasksProps = {
  tasks: Array<TaskInterface>,
  setTasks: React.Dispatch<SetStateAction<TaskInterface[]>>,
};

const Tasks = ({ tasks, setTasks }: TasksProps) => {
  return (
    <ul>
      {tasks.map(task => <Task key={task.id} tasks={tasks} task={task} setTasks={setTasks} />)}
    </ul>
  );
};

export default Tasks;