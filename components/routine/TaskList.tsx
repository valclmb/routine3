import { CircleCheckBig, LogIn, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext } from "react";

import { RoutineContext } from "@/contexts/RoutineContext";
import { useAuth } from "@/hooks/useAuth";
import { DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TimeSlot } from "./Routine";
import { TaskForm } from "./TaskForm";

export const TaskList = () => {
  const { routine, removeTask, saveRoutine } = useContext(RoutineContext);
  const { user } = useAuth();

  const handleSaveRoutine = () => {
    if (user) {
      saveRoutine();
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {routine.map((timeSlot: TimeSlot) => (
        <Popover key={timeSlot.id}>
          <PopoverTrigger asChild className="cursor-pointer">
            <div className="border rounded-md px-5 py-2  duration-300 hover:opacity-80">
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
          <Button
            variant="outline"
            className="transition-opacity duration-300 hover:opacity-80"
          >
            <Plus />
            Ajouter une activité
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <TaskForm />
        </PopoverContent>
      </Popover>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={handleSaveRoutine}
            className="transition-opacity duration-300 hover:opacity-80"
          >
            <CircleCheckBig />
            Enregistrer la routine
          </Button>
        </DialogTrigger>

        {!user && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enregistrer la routine</DialogTitle>

              <DialogDescription>
                Pour enregistrer votre routine, veuillez vous connecter ou créer
                un compte.
                <Link href="/login" className="block">
                  <Button variant="outline" className="mt-4">
                    <LogIn />
                    Se connecter
                  </Button>
                </Link>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
      {/* <Button
        onClick={saveRoutine}
        className="transition-opacity duration-300 hover:opacity-80"
      >
        <CircleCheckBig />
        Enregistrer la routine
      </Button> */}
    </div>
  );
};
