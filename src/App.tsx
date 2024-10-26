import { useEffect, useState } from "react";
import "./App.css";

interface Task {
  id: number;
  text: string;
  isDone: boolean;
}
function App() {
  const [tasks, setTasks] = useState<Task[]>(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks")!)
      : []
  );
  const [text, setText] = useState<string>("");
  const createTask = () => {
    if (!text) return;
    setTasks([...tasks, { id: tasks.length, text, isDone: false }]);
    setText("");
  };
  const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="bg-white w-full md:w-6xl mx-2 md:mx-32 px-4 md:px-16 my-16 h-full shadow-md rounded-xl flex flex-col">
      <button
        onClick={() => setTasks([])}
        className="bg-red-500 text-white p-2 rounded-lg max-w-32 my-4 right-0"
      >
        Clear All
      </button>
      <div className="flex flex-col gap-4">
        <label className="text-lg" htmlFor="task_input">
          Add Task
        </label>
        <input
          id="task_input"
          onKeyDown={submitOnEnter}
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="border-2 border-gray-300 p-2 rounded-lg w-full"
          placeholder="Enter your task here"
        />
      </div>

      <div className="flex flex-col gap-4 mt-4 py-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex flex-row justify-between">
            <p className={task.isDone ? "line-through text-lg" : "text-lg"}>
              {task.text}
            </p>
            <div className="flex flex-row justify-end gap-4">
              <button
                className={
                  task.isDone
                    ? "bg-blue-500 text-white p-2 rounded-lg"
                    : "bg-green-500 text-white p-2 rounded-lg"
                }
                onClick={() =>
                  setTasks(
                    tasks.map((t) =>
                      t.id === task.id ? { ...t, isDone: !t.isDone } : t
                    )
                  )
                }
              >
                {task.isDone ? "Undone" : "Done"}
              </button>
              <button
                onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
