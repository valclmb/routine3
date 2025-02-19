import { useRoutine, UseRoutineReturn } from "@/hooks/useRoutine";
import { createContext } from "react";

export const RoutineContext = createContext<UseRoutineReturn>({
  routine: [],
  addTask: () => {},
  removeTask: () => {},
  saveRoutine: () => {},
});

export const RoutineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const routineUtils = useRoutine();

  return (
    <RoutineContext.Provider value={routineUtils}>
      {children}
    </RoutineContext.Provider>
  );
};
