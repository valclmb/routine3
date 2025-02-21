import { Schema } from "@/amplify/data/resource";
import { AuthContext } from "@/contexts/AuthContext";
import { generateClient } from "@aws-amplify/api";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Routine, TimeSlot } from "../components/routine/Routine";
export type UseRoutineReturn = {
  routine: Routine;
  addTask: (task: TimeSlot) => void;
  removeTask: (id: string) => void;
  saveRoutine: () => void;
};

const client = generateClient<Schema>();

export const useRoutine = (): UseRoutineReturn => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [routine, setRoutine] = useState<Routine>([]);

  const listRoutines = () => {
    if (!isAuthenticated) {
      setRoutine([]);
      return;
    }

    client.models.Routine.list().then((res) => {
      if (res.data[0]?.tasks) {
        setRoutine(res.data[0].tasks as TimeSlot[]);
      }
    });
  };

  useEffect(() => {
    listRoutines();
  }, [isAuthenticated]);

  const addTask = (task: TimeSlot) => {
    setRoutine([...routine, task]);
  };

  const removeTask = (id: string) => {
    setRoutine(routine.filter((t) => t.id !== id));
  };

  const saveRoutine = async () => {
    try {
      // Récupérer toutes les routines de l'utilisateur
      const existingRoutines = await client.models.Routine.list();

      if (existingRoutines.data.length > 0) {
        // Si une routine existe déjà, mettez à jour l'existante
        const routineId = existingRoutines.data[0].id;
        await client.models.Routine.update({
          id: routineId,
          tasks: routine,
        });
      } else {
        // Créer une nouvelle routine si aucune n'existe
        await client.models.Routine.create({
          // userId: user?.userId,
          tasks: routine,
        });
      }

      toast("Routine enregistrée", {
        duration: 2000,
        icon: "🔥",
        description: "Votre routine a été enregistrée avec succès",
      });
    } catch (err) {
      toast("Une erreur est survenue", {
        duration: 2000,
        icon: "❌",
        description: "Une erreur est survenue lors de l'enregistrement",
      });
    }
  };

  return { routine, addTask, removeTask, saveRoutine };
};
