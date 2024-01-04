"use client";
import CreateTask from "@/components/task/CreateTask";
import TaskFilter from "@/components/task/TaskFilter";
import TaskItem from "@/components/task/TaskItem";
import { apiGet } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [name, setName] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const router = useRouter();
  if (typeof window !== "undefined" && !localStorage.getItem("token")){
    return router.push("/signin");
  }

  useEffect(() => {
    async function fetchTasks() {
      if (typeof window !== "undefined") {
        setName((prev) => localStorage.getItem("name"));
        setEmail((prev) => localStorage.getItem("email"));
      }
      try {
        const res = await apiGet("http://127.0.0.1:4000/tasks", true);
        setTasks(res.data);
        setFilteredTasks(res.data);
      } catch (e: any) {
        alert(e.message);
      }
    }
    fetchTasks();
  }, []);

  const updateTasks = (todo_id: string, field: string, updated: string) => {
    if (field === "title") {
      setTasks((prev_tasks) => {
        const updated_tasks = prev_tasks.map((prev_task) => {
          return prev_task._id === todo_id
            ? { ...prev_task, title: updated }
            : prev_task;
        });
        return updated_tasks;
      });
    } else if (field === "desc") {
      setTasks((prev_tasks) => {
        const updated_tasks = prev_tasks.map((prev_task) => {
          return prev_task._id === todo_id
            ? { ...prev_task, desc: updated }
            : prev_task;
        });
        return updated_tasks;
      });
    } else if (field === "status")
      setTasks((prev_tasks) => {
        const updated_tasks = prev_tasks.map((prev_task) => {
          return prev_task._id === todo_id
            ? { ...prev_task, status: updated }
            : prev_task;
        });
        return updated_tasks;
      });
  };
  const deleteTask = (todo_id: string) => {
    setTasks((prev_tasks) =>
      prev_tasks.filter((prev_task) => prev_task._id != todo_id)
    );
  };
  return (
    <main className="">
      <div className="px-4 py-6 mx-auto my-5 max-w-2xl">
        <div className="my-4 mb-10">
          <h1 data-testid="name" className="text-2xl font-bold">
            welcome {name}
          </h1>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center justify-between mb-2">
          <CreateTask setTasks={setTasks} />
          <TaskFilter
            tasks={tasks}
            setFilteredTasks={setFilteredTasks}
            filteredTasks={filteredTasks}
          />
        </div>
        <div className="mb-10">
          {filteredTasks?.length !== 0 ? (
            filteredTasks?.map((task: Task) => (
              <TaskItem
                key={task._id}
                task={task}
                updateTasks={updateTasks}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <div>
              <p className="text-center font-semibold text-gray-400">
                No tasks to show. Click on `Create task` button to create a new
                task.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
