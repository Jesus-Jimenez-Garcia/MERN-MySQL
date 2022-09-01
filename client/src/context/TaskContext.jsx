import { createContext, useContext, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be usedd within a TaskContextPprovider");
  } else {
    return context;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasksRequest = async () => {
    const response = await axios.get("http://localhost:4000/tasks");
    setTasks(response.data);
  };

  const deleteTaskRequest = async (id) => {
    try {
      setTasks(tasks.filter((task) => task.id !== id));
      console.log(`Elemento con ID ${id} borrado`);
      await axios({
        method: "delete",
        url: "http://localhost:4000/tasks/" + id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createTaskRequest = async (task) => {
    const response = await axios.post("http://localhost:4000/tasks", task);
    console.log(response.data);
    //setTasks([...tasks, response.data]) No necesario ahora, pero buena manera de actualizar
  };

  const getTaskRequest = async (id) => {
    const response = await axios.get(`http://localhost:4000/tasks/${id}`);
    return response.data;
  };

  const updateTaskRequest = async (id, newFields) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/tasks/" + id,
        newFields
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasksRequest,
        deleteTaskRequest,
        createTaskRequest,
        getTaskRequest,
        updateTaskRequest,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
