import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

export const BACKEND_URL =
  "https://react-http-f9e58-default-rtdb.firebaseio.com/tasks.json";

function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequest: fetchTasks} = useHttp({
    url: BACKEND_URL,
    method: "GET",
  });

  useEffect(() => {
    const data = fetchTasks();

    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;
