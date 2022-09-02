import { Formik, Form } from "formik";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTaskRequest, getTaskRequest, updateTaskRequest } = useTasks();
  const [task, setTask] = useState({ title: "", description: "" });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        try {
          const task = await getTaskRequest(params.id);
          setTask({
            title: task.title,
            description: task.description,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);
          try {
            if (params.id) {
              updateTaskRequest(params.id, values);
            } else {
              createTaskRequest(values);
            }
            navigate("/");
            setTask({ title: "", description: "" });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Edit Task" : "Create Task"}
            </h1>
            <label className="block capitalize my-3">title</label>
            <input
              name="title"
              placeholder="Write a title"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.title}
            />
            <label className="block capitalize my-3">description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.description}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 p-2 text-white w-full rounded-sm mt-3"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
