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
import { IconEdit } from "@tabler/icons-react";
import { apiPatch } from "@/lib/utils";

const EditTask = ({
  task,
  handleDescChange,
  handleTitleChange,
}: {
  task: Task;
  handleDescChange: (desc: string) => Promise<void>;
  handleTitleChange: (title: string) => Promise<void>;

}) => {
  const [title, setTitle] = useState<string>(task.title);
  const [desc, setDesc] = useState<string>(task.desc);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);


  const handleSave = async() => {
    setLoading(true)
    if(task.title !== title){
      await handleTitleChange(title)
    } 
    if(task.desc !== desc) await handleDescChange(desc)
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconEdit data-testid="edit-task-button" className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent data-testid="edit-task-dialog" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
           {"Make changes to your Task here. Click save when you're done."}
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
            type="submit"
            onClick={handleSave}
            disabled={loading || desc.length === 0 || title.length === 0}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
