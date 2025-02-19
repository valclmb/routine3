"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RoutineContext } from "@/contexts/RoutineContext";
import { useContext } from "react";
import { TimeSlot } from "./Routine";

const TooltipContent = ({ payload }: { payload: TimeSlot }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-sm"
        style={{ backgroundColor: payload.color }}
      ></div>
      <div>
        <span className="font-bold">{payload.name}</span>
        <div>
          {payload.start} - {payload.end}
        </div>
      </div>
    </div>
  );
};
export default function TimeRing() {
  const { routine } = useContext(RoutineContext);
  // Fonction pour convertir HH:mm en angle (24h = 360 degrés)
  const timeToAngle = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);

    return ((hours * 60 + minutes) * 360) / (24 * 60) - 90;
  };
  // Fonction pour convertir une plage horaire en startAngle et endAngle
  const getTimeSlotAngles = (start: string, end: string) => {
    const startAngle = timeToAngle(start);
    let endAngle = timeToAngle(end);

    // Si l'heure de fin est plus petite que l'heure de début,
    // cela signifie qu'on traverse minuit
    if (endAngle < startAngle) {
      endAngle += 360;
    }

    return {
      startAngle: startAngle,
      endAngle: endAngle,
    };
  };

  return (
    <div className=" relative">
      <ChartContainer className="h-[350px] absolute" config={{}}>
        <PieChart>
          <Pie
            data={[{ value: 100 }]}
            dataKey="value"
            innerRadius={105}
            outerRadius={135}
            fill="hsl(var(--muted))"
            stroke="none"
          />
        </PieChart>
      </ChartContainer>
      <ChartContainer className="h-[350px]" config={{}}>
        <PieChart>
          {/* Segments de temps */}
          {routine.map((task: TimeSlot, index: number) => {
            const angles = getTimeSlotAngles(task.start, task.end);
            return (
              <Pie
                key={index}
                data={[{ value: 100, ...task }]}
                dataKey="value"
                innerRadius={100}
                outerRadius={140}
                startAngle={-angles.startAngle}
                endAngle={-angles.endAngle}
                fill={task.color}
                stroke="none"
                cornerRadius={10}
              />
            );
          })}
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(_, __, { payload }) => (
              <TooltipContent payload={payload} />
            )}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
