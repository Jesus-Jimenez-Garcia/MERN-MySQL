import { Formik, Form } from "formik";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTaskRequest, getTaskRequest, updateTaskRequest } = useTasks();
  const [task, setTask] = useState({title: "", description: ""});
  const params = useParams();
  const navigate = useNavigate()

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
          console.error(error)
        }
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <h1>{params.id ? "Edit Task" : "Create Task"}</h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);
          try {
            if (params.id){
              updateTaskRequest(params.id, values)
            } else {
              createTaskRequest(values)
            }
            navigate("/")
            setTask({title: "", description: ""})
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>title</label>
            <input
              name="title"
              placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
            />
            <label>description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.description}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
