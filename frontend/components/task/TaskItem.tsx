import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { apiDelete, apiPatch, cn } from "@/lib/utils";
import { IconSquareLetterX } from "@tabler/icons-react";
import EditTask from "./EditTask";
const TaskItem = ({
  task,
  updateTasks,
  deleteTask,
}: {
  task: Task;
  updateTasks: (todo_id: string, field: string, updated: string) => void;
  deleteTask: (todo_id: string) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (payload: Record<string, string>) => {
    setLoading((prev) => true);
    try {
      const res = await apiPatch(
        `http://127.0.0.1:4000/tasks/${task._id}`,
        true,
        payload
      );
      const key = Object.keys(payload)[0];
      const value = Object.values(payload)[0];
      updateTasks(task._id, key, value);
    } catch (e: any) {
      alert(e.message);
    }
    setLoading((prev) => false);
  };
  const handleStatusChange = async (status: string) => {
    await handleChange({ status: status });
  };

  const handleDescChange = async (desc: string) => {
    await handleChange({ desc: desc });
  };
  const handleTitleChange = async (title: string) => {
    await handleChange({ title: title });
  };
  const handleDelete = async () => {
    setLoading((prev) => true);
    try {
      const res = await apiDelete(
        `http://127.0.0.1:4000/tasks/${task._id}`,
        true
      );
      deleteTask(task._id)
    } catch (error: any) {
      alert(error.message);
    }
    setLoading((prev) => false);
  };

  return (
    <div data-testid="task-item" id={task._id} className="max-w-2xl my-4 px-4 py-6 border rounded-md">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-md font-semibold">{task.title}</p>
        <div className="flex items-center gap-5">
          <EditTask task={task} handleDescChange={handleDescChange} handleTitleChange={handleTitleChange} />
          <IconSquareLetterX
            onClick={handleDelete}
            className=" text-red-500 hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm">{task.desc}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Button
              onClick={() => handleStatusChange("To Do")}
              variant="outline"
              className={cn(
                "w-full",
                task.status === "To Do" ? "bg-red-500" : ""
              )}
              disabled={task.status === "To Do" || loading}
            >
              To Do
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleStatusChange("In Progress")}
              value="In Progress"
              variant="outline"
              className={cn(
                "w-full",
                task.status === "In Progress" ? "bg-blue-500" : ""
              )}
              disabled={task.status === "In Progress" || loading}
            >
              In Progress
            </Button>
          </div>
          <div>
            <Button
              value="Done"
              onClick={() => handleStatusChange("Done")}
              variant="outline"
              className={cn(
                "w-full",
                task.status === "Done" ? "bg-green-500" : ""
              )}
              disabled={task.status === "Done" || loading}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
