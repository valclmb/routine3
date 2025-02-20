import { Schema } from "@/amplify/data/resource";
import { generateClient } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Routine, TimeSlot } from "../components/routine/Routine";
export type UseRoutineReturn = {
  routine: Routine;
  addTask: (task: TimeSlot) => void;
  removeTask: (id: string) => void;
  saveRoutine: () => void;
};

// function createTodo() {
//   client.models.Todo.create({
//     content: window.prompt("Todo content"),
//   });
// }
const client = generateClient<Schema>();

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

  const saveRoutine = async () => {
    console.log(routine);
    try {
      await client.models.Routine.create({
        id: "1",
        tasks: routine,
      });

      toast("Routine enregistrée", {
        duration: 2000,
        icon: "🔥",
        description: "Votre routine a été enregistrée avec succès",
      });
    } catch (error) {
      toast("Erreur d'enregistrement", {
        duration: 2000,
        icon: "❌",
        description:
          "Une erreur est survenue lors de l'enregistrement de votre routine",
      });
    }
  };

  return { routine, addTask, removeTask, saveRoutine };
};
