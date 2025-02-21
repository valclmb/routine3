import { RoutineProvider } from "@/contexts/RoutineContext";
import { TaskList } from "./TaskList";
import TimeRing from "./TimeRing";

export type TimeSlot = {
  id: string;
  name: string;
  start: string;
  end: string;
  color: string;
};

export type Routine = TimeSlot[];

export const Routine = () => {
  return (
    <div className=" text-center">
      <h1 className="text-4xl font-bold">Routine.</h1>
      <p className="text-muted-foreground ">
        Créez votre routine personnalisée
      </p>
      <div className="flex items-center gap-10 pt-20">
        <RoutineProvider>
          <TimeRing />
          <TaskList />
        </RoutineProvider>
      </div>
    </div>
  );
};
