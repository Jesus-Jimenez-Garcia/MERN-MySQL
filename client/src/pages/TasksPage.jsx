import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

function TasksPage() {
  const { tasks, getTasksRequest } = useTasks();
  useEffect(() => {
    getTasksRequest();
  }, []);

  function renderMain() {
    if (tasks.length === 0) return <h1>No tasks yet</h1>;
    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  }

  return (
    <div>
      <h1 className="text-5xl text-white text-center font-bold mb-5">Tasks</h1>
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>
    </div>
  );
}

export default TasksPage;
