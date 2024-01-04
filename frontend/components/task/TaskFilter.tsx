import { Button } from "@/components/ui/button"
import {IconChevronDown} from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const TaskFilter = ({tasks, filteredTasks, setFilteredTasks}: {tasks: Task[], filteredTasks: Task[], setFilteredTasks: Dispatch<SetStateAction<Task[]>>}) => {
  const [position, setPosition] = useState("All")
   
  useEffect(() => {
    if(position === 'All') {
      setFilteredTasks(prev => tasks)
    } else if(position === 'To Do') {
      setFilteredTasks(prev => {
        return tasks.filter(task => task.status === 'To Do')
      })
    } else if(position === 'In Progress') {
      setFilteredTasks(prev => {
        return tasks.filter(task => task.status === 'In Progress')
      })
    }
    else if(position === 'Done') {
      setFilteredTasks(prev => {
        return tasks.filter(task => task.status === 'Done')
      })
    }
  }, [position])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="min-w-[150px]" variant="outline">
          <div className="w-full flex items-center justify-between gap-2">
            {position}
            <IconChevronDown className="h-5" />
          </div>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[90vw] sm:w-56 mx-5">
        <DropdownMenuLabel>Task Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="To Do">To Do</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="In Progress">In Progress</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Done">Done</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TaskFilter