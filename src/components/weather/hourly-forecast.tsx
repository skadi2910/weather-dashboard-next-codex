import { formatLocalTime } from "@/lib/weather-formatters";
import type { WeatherPayload } from "@/types/weather";
import { WeatherGlyph } from "@/components/weather/weather-glyph";
import { cn } from "@/lib/utils";

type HourlyForecastProps = {
  data: WeatherPayload;
  panelClassName: string;
};

export function HourlyForecast({
  data,
  panelClassName,
}: HourlyForecastProps) {
  return (
    <aside
      className={cn(
        "rounded-[2rem] border p-5 backdrop-blur-md",
        panelClassName,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-current/55">
            Next 8 hours
          </p>
          <p className="mt-2 text-sm text-current/70">
            A quick read on temperature and rain risk through the rest of
            today.
          </p>
        </div>
        <div className="rounded-full border border-slate-950/10 bg-white/24 px-3 py-2 text-xs uppercase tracking-[0.25em] text-current/60 dark:border-white/15 dark:bg-black/10">
          Hourly
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {data.hourly.map((hour) => (
          <div
            key={hour.time}
            className="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-2 rounded-[1.25rem] border border-slate-950/10 bg-white/24 px-4 py-3 dark:border-white/12 dark:bg-black/8 sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-4"
          >
            <span className="text-sm text-current/75">
              {formatLocalTime(hour.time, data.location.timezone, {
                hour: "numeric",
              })}
            </span>
            <div className="flex items-center gap-3">
              <WeatherGlyph
                className="size-5"
                theme={hour.condition.theme}
                isDay={hour.isDay}
              />
              <span className="text-sm text-current/75">
                {hour.condition.label}
              </span>
            </div>
            <span className="text-sm text-current/60">
              {hour.precipitationProbability}%
            </span>
            <span className="font-semibold sm:justify-self-end">
              {hour.temperature}°
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
