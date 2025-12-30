import { useColors } from "@/context/colorContext";
import React from "react";

export default function StepsLoader({
  steps,
  totalSteps,
}: {
  steps: number;
  totalSteps: number;
}) {
  const colors = useColors();
  return (
    <div className="flex items-center gap-x-4 pt-3 ">
      <div className="progress-cont w-full h-0.5 bg-blue-700/10 relative rounded-md">
        <div
          className="progress-bar transition-all absolute rounded-md h-full top-0 left-0"
          style={{
            background: colors.defaultblue,
            width: (steps / totalSteps) * 100 + "%",
          }}
        ></div>
      </div>
    </div>
  );
}
