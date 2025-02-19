import { CircleCheckBig, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext } from "react";

import { RoutineContext } from "@/contexts/RoutineContext";
import { TimeSlot } from "./Routine";
import { TaskForm } from "./TaskForm";

export const TaskList = () => {
  const { routine, removeTask, saveRoutine } = useContext(RoutineContext);

  return (
    <div className="flex flex-col gap-2">
      {routine.map((timeSlot: TimeSlot) => (
        <Popover key={timeSlot.id}>
          <PopoverTrigger asChild className="cursor-pointer">
            <div className="border rounded-md px-5 py-2">
              <div className="flex items-center justify-between gap-2">
                {/* Display the infos of the task */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: timeSlot.color }}
                  ></div>
                  <div>
                    <span className="font-bold">{timeSlot.name}</span>{" "}
                    {timeSlot.start} - {timeSlot.end}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  type="button"
                  onClick={() => removeTask(timeSlot.id)}
                >
                  <Minus />
                </Button>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <TaskForm />
          </PopoverContent>
        </Popover>
      ))}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Plus />
            Ajouter une activité
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <TaskForm />
        </PopoverContent>
      </Popover>
      <Button onClick={saveRoutine}>
        <CircleCheckBig />
        Enregistrer la routine
      </Button>
    </div>
  );
};
