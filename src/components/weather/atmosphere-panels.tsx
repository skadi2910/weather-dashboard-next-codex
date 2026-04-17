import { Sun, Sunrise, Sunset } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { WeatherGlyph } from "@/components/weather/weather-glyph";
import { formatLocalTime } from "@/lib/weather-formatters";
import type { WeatherPayload } from "@/types/weather";

type AtmospherePanelsProps = {
  data: WeatherPayload;
};

function getForecastCharacter(theme: WeatherPayload["current"]["condition"]["theme"]) {
  if (theme === "storm") {
    return "Bold, unstable skies";
  }

  if (theme === "rain") {
    return "Moody with passing showers";
  }

  if (theme === "clear") {
    return "Bright and open air";
  }

  if (theme === "night") {
    return "Calm evening atmosphere";
  }

  return "Soft layered cloud cover";
}

function getUvSummary(uvIndex: number) {
  return uvIndex >= 6
    ? "Strong sun exposure. Sunglasses and shade will help."
    : "Comfortable sun levels for most outdoor plans.";
}

export function AtmospherePanels({ data }: AtmospherePanelsProps) {
  return (
    <div className="grid gap-6">
      <div className="rounded-[1.5rem] border border-slate-950/10 bg-white/24 p-4 backdrop-blur-xl dark:border-white/15 dark:bg-white/10 md:rounded-[2rem] md:p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-current/55">
          Sun cycle
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-slate-950/10 bg-white/26 p-4 dark:border-white/12 dark:bg-black/10">
            <div className="flex items-center gap-3 text-current/70">
              <Sunrise className="size-5" />
              <span className="text-sm uppercase tracking-[0.25em]">
                Sunrise
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold">
              {formatLocalTime(data.daily[0].sunrise, data.location.timezone, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-950/10 bg-white/26 p-4 dark:border-white/12 dark:bg-black/10">
            <div className="flex items-center gap-3 text-current/70">
              <Sunset className="size-5" />
              <span className="text-sm uppercase tracking-[0.25em]">
                Sunset
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold">
              {formatLocalTime(data.daily[0].sunset, data.location.timezone, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-slate-950/10 bg-white/24 p-4 backdrop-blur-xl dark:border-white/15 dark:bg-black/10 md:rounded-[2rem] md:p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-current/55">
          Atmospheric notes
        </p>
        <div className="mt-5 space-y-4">
          <div className="rounded-[1.25rem] border border-slate-950/10 bg-white/26 p-4 dark:border-white/12 dark:bg-white/10">
            <div className="flex items-center justify-between text-current/70">
              <span className="text-sm uppercase tracking-[0.25em]">
                UV index
              </span>
              <Sun className="size-5" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{data.current.uvIndex}</p>
            <p className="mt-2 text-sm text-current/65">
              {getUvSummary(data.current.uvIndex)}
            </p>
          </div>

          <Separator className="bg-slate-950/8 dark:bg-white/10" />

          <div className="flex items-start justify-between gap-4 rounded-[1.25rem] border border-slate-950/10 bg-white/26 p-4 dark:border-white/12 dark:bg-white/10">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-current/55">
                Forecast character
              </p>
              <p className="mt-3 text-lg font-medium">
                {getForecastCharacter(data.current.condition.theme)}
              </p>
            </div>
            <WeatherGlyph
              className="size-7"
              theme={data.current.condition.theme}
              isDay={data.current.isDay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
