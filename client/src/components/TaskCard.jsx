import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTaskRequest, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-700 border border-dotted border-zinc-300 text-white rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>

        <span>{task.done == 1 ? "✔️   " : "❌   "}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span>{task.createdAt}</span>
      <div className="flex gap-x-1 mt-2 sm:flex sm:flex-col sm:justify-center sm:gap-y-1 sm:w-16 sm:m-auto sm:mt-2">
        <button
          className="bg-red-500 px-2 py-1 text-white"
          onClick={() => deleteTaskRequest(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-800 px-2 py-1 text-white"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-gray-300 px-2 py-1 text-black"
          onClick={() => toggleTaskDone(task.id, task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
