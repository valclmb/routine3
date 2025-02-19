import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Routine, TimeSlot } from "../components/routine/Routine";

export type UseRoutineReturn = {
  routine: Routine;
  addTask: (task: TimeSlot) => void;
  removeTask: (id: string) => void;
  saveRoutine: () => void;
};

export const useRoutine = (): UseRoutineReturn => {
  const [routine, setRoutine] = useState<Routine>([]);

  useEffect(() => {
    const value = localStorage.getItem("routine");
    setRoutine(JSON.parse(value || "[]"));
  }, []);

  const addTask = (task: TimeSlot) => {
    setRoutine([...routine, task]);
  };

  const removeTask = (id: string) => {
    setRoutine(routine.filter((t) => t.id !== id));
  };

  const saveRoutine = () => {
    localStorage.setItem("routine", JSON.stringify(routine));

    toast("Routine enregistrée", {
      duration: 2000,
      icon: "🔥",
      description: "Votre routine a été enregistrée avec succès",
    });
  };

  return { routine, addTask, removeTask, saveRoutine };
};
