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
    <div className="flex items-center p-10">
      <TimeRing />
      <TaskList />
    </div>
  );
};
