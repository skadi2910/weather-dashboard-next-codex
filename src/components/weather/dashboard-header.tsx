import { MapPin } from "lucide-react";

import { LocationSearch } from "@/components/weather/location-search";
import { ThemeToggle } from "@/components/weather/theme-toggle";
import { UnitToggle } from "@/components/weather/unit-toggle";
import { WeatherGlyph } from "@/components/weather/weather-glyph";
import type { WeatherPayload } from "@/types/weather";

type DashboardHeaderProps = {
  data: WeatherPayload;
  query: string;
  chipClassName: string;
};

export function DashboardHeader({
  data,
  query,
  chipClassName,
}: DashboardHeaderProps) {
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-current/60">
            Weather Dashboard
          </p>
          <div className="mt-3 flex items-start gap-3 sm:items-center">
            <WeatherGlyph
              className="mt-1 size-8 sm:mt-0 sm:size-10"
              theme={data.current.condition.theme}
              isDay={data.current.isDay}
            />
            <div>
              <h1 className="font-heading text-3xl leading-none font-semibold sm:text-4xl lg:text-5xl">
                {data.location.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-current/70">
                <MapPin className="size-4" />
                {data.location.admin1
                  ? `${data.location.admin1}, ${data.location.country}`
                  : data.location.country}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <UnitToggle
            query={query}
            unit={data.unit}
            chipClassName={chipClassName}
          />
          <ThemeToggle />
        </div>
      </div>

      <LocationSearch initialQuery={query} unit={data.unit} />
    </>
  );
}
