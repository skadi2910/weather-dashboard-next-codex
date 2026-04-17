import { Eye, Gauge, Droplets, Wind } from "lucide-react";

import { WeatherGlyph } from "@/components/weather/weather-glyph";
import {
  formatLocalTime,
  getTemperatureUnit,
  getVisibilityDisplay,
  getWindUnit,
} from "@/lib/weather-formatters";
import type { WeatherPayload } from "@/types/weather";

type CurrentOverviewProps = {
  data: WeatherPayload;
};

const highlightConfigs = [
  { label: "Wind", icon: Wind, valueKey: "wind" },
  { label: "Humidity", icon: Droplets, valueKey: "humidity" },
  { label: "Visibility", icon: Eye, valueKey: "visibility" },
  { label: "Pressure", icon: Gauge, valueKey: "pressure" },
] as const;

export function CurrentOverview({ data }: CurrentOverviewProps) {
  const temperatureUnit = getTemperatureUnit(data.unit);
  const windUnit = getWindUnit(data.unit);
  const visibility = getVisibilityDisplay(data.current.visibility, data.unit);
  const highlights = {
    wind: `${data.current.windSpeed} ${windUnit}`,
    humidity: `${data.current.humidity}%`,
    visibility: `${visibility.value} ${visibility.unit}`,
    pressure: `${data.current.pressure} hPa`,
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="flex min-h-[18rem] flex-col justify-between rounded-[1.5rem] border border-slate-950/10 bg-white/22 p-5 dark:border-white/15 dark:bg-white/10 md:rounded-[2rem] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-current/55">
              Right now
            </p>
            <div className="mt-5 flex items-end gap-2 sm:gap-3">
              <span className="font-heading text-6xl leading-none font-semibold sm:text-7xl lg:text-8xl">
                {data.current.temperature}°
              </span>
              <span className="pb-2 text-base text-current/70 sm:pb-3 sm:text-lg">
                {temperatureUnit}
              </span>
            </div>
          </div>

          <div className="rounded-full border border-slate-950/10 bg-white/26 p-3 dark:border-white/15 dark:bg-white/12 sm:p-4">
            <WeatherGlyph
              className="size-7 sm:size-9"
              theme={data.current.condition.theme}
              isDay={data.current.isDay}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xl font-medium">{data.current.condition.label}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-current/72">
              Feels like {data.current.apparentTemperature}°{temperatureUnit},
              with a {data.current.precipitationProbability}% chance of
              precipitation and steady atmospheric conditions through the next
              few hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-current/72 sm:gap-3">
            <span className="rounded-full border border-slate-950/10 bg-white/24 px-3 py-2 dark:border-white/15 dark:bg-white/10 sm:px-4">
              Local time{" "}
              {formatLocalTime(data.current.time, data.location.timezone, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
            <span className="rounded-full border border-slate-950/10 bg-white/24 px-3 py-2 dark:border-white/15 dark:bg-white/10 sm:px-4">
              Updated{" "}
              {formatLocalTime(data.current.time, data.location.timezone, {
                weekday: "short",
                hour: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-950/10 bg-white/22 p-5 dark:border-white/15 dark:bg-black/12 md:rounded-[2rem]">
        <p className="text-sm uppercase tracking-[0.28em] text-current/55">
          Live highlights
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {highlightConfigs.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border border-slate-950/10 bg-white/26 p-4 dark:border-white/12 dark:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <item.icon className="size-5 text-current/70" />
                <span className="text-xs uppercase tracking-[0.25em] text-current/45">
                  {item.label}
                </span>
              </div>
              <p className="mt-5 text-2xl font-semibold">
                {highlights[item.valueKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
