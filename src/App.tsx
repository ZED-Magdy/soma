import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const createTask = () => {
    if (!text) return;
    setTasks([...tasks, { id: tasks.length, text, isDone: false }]);
    setText("");
    toast({
      title: "Task Created",
      description: `Task ${text} has been created successfully`,
    });
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
    <Card className=" mx-2 px-4 md:px-16 my-16 flex flex-col">
      <div className="w-full flex justify-end">
        <Button
          variant={"destructive"}
          onClick={clearAllTasks}
          className="max-w-32 my-4 right-0"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Label className="text-lg" htmlFor="task_input">
          Add Task
        </Label>
        <Input
          id="task_input"
          onKeyDown={submitOnEnter}
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="w-full"
          placeholder="Enter your task here"
        />
      </div>

      <div className="flex flex-col gap-4 mt-4 py-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center"
          >
            <Label
              className={
                task.isDone
                  ? "line-through text-sm md:text-lg"
                  : "text-sm md:text-lg"
              }
            >
              {task.text}
            </Label>
            <div className="flex flex-row justify-end gap-4">
              <Button
                variant={"default"}
                className={
                  task.isDone
                    ? "text-white bg-blue-500"
                    : "text-white bg-green-500"
                }
                onClick={toggleTaskCompletion(task)}
              >
                {task.isDone ? "Undone" : "Done"}
              </Button>
              <Button variant={"destructive"} onClick={deleteTask(task)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </Card>
  );

  function clearAllTasks() {
    setTasks([]);
    toast({
      title: "Tasks Cleared",
      description: `All tasks have been cleared successfully`,
    });
  }

  function toggleTaskCompletion(task: Task) {
    return () => {
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, isDone: !t.isDone } : t))
      );
      toast({
        title: "Task Updated",
        description: `Task ${task.text} has been marked as ${
          task.isDone ? "undone" : "done"
        }`,
      });
    };
  }

  function deleteTask(task: Task) {
    return () => {
      setTasks(tasks.filter((t) => t.id !== task.id));
      toast({
        title: "Task Deleted",
        description: `Task ${task.text} has been deleted successfully`,
      });
    };
  }
}

export default App;
