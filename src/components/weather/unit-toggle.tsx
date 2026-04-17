import { cn } from "@/lib/utils";
import { buildUnitHref } from "@/lib/weather-formatters";
import type { UnitSystem } from "@/types/weather";

type UnitToggleProps = {
  query: string;
  unit: UnitSystem;
  chipClassName: string;
};

export function UnitToggle({
  query,
  unit,
  chipClassName,
}: UnitToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-white/15 bg-black/10 p-1 backdrop-blur-md">
      {(["metric", "imperial"] as const).map((option) => {
        const isActive = option === unit;

        return (
          <a
            key={option}
            href={buildUnitHref(query, option)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              isActive ? chipClassName : "text-current/65 hover:text-current",
            )}
          >
            {option === "metric" ? "Metric" : "Imperial"}
          </a>
        );
      })}
    </div>
  );
}
