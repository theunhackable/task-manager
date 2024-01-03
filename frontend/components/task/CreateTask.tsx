import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { IconSquarePlus } from "@tabler/icons-react";
import { apiPost } from "@/lib/utils";

const CreateTask = ({
  setTasks,
}: {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  const [title, setTitle] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSubmit = async () => {
    setLoading((prev) => true);
    try {
      const res = await apiPost("http://127.0.0.1:4000/tasks", true, { title, desc });
      
      setTasks(prev => [res.data, ...prev])
      setIsOpen(prev => false)
    } catch (e: any) {
      alert(e.message);
    }
    setLoading(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <div className="flex items-center gap-2">
            <IconSquarePlus />
            <p className="text-base font-bold">Create Task</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Add the details of the task. Click Create Task when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title*</Label>
            <Input
              id="title"
              value={title || ""}
              onChange={(e) => setTitle((prev) => e.target.value)}
              placeholder="Task title"
              className="col-span-3"
            />
          </div>
          <div className="grid sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="desc">Description*</Label>

            <Input
              id="desc"
              value={desc || ""}
              onChange={(e) => setDesc((prev) => e.target.value)}
              placeholder="description"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              loading ||
              (desc === null && title === null) ||
              desc?.length === 0 ||
              title?.length === 0
            }
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
