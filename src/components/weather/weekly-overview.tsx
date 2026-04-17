import { formatLocalTime, getPrecipitationUnit } from "@/lib/weather-formatters";
import type { WeatherPayload } from "@/types/weather";
import { WeatherGlyph } from "@/components/weather/weather-glyph";

type WeeklyOverviewProps = {
  data: WeatherPayload;
};

export function WeeklyOverview({ data }: WeeklyOverviewProps) {
  const precipitationUnit = getPrecipitationUnit(data.unit);

  return (
    <div className="rounded-[1.5rem] border border-slate-950/10 bg-white/24 p-4 backdrop-blur-xl dark:border-white/15 dark:bg-black/10 md:rounded-[2rem] md:p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-current/55">
            7 day outlook
          </p>
          <p className="mt-2 text-sm text-current/70">
            The week ahead, tuned for quick scanning.
          </p>
        </div>
        <div className="text-sm text-current/55">
          Precipitation in {precipitationUnit}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {data.daily.map((day, index) => (
          <div
            key={day.date}
            className="grid gap-3 rounded-[1.25rem] border border-slate-950/10 bg-white/26 px-4 py-4 dark:border-white/12 dark:bg-white/10 sm:grid-cols-[1.2fr_auto_1fr_auto] sm:items-center sm:gap-4"
          >
            <div className="min-w-0">
              <p className="font-medium">
                {index === 0
                  ? "Today"
                  : formatLocalTime(day.date, data.location.timezone, {
                      weekday: "long",
                    })}
              </p>
              <p className="mt-1 text-sm text-current/65">
                {day.condition.label}
              </p>
            </div>

            <WeatherGlyph
              className="size-5"
              theme={day.condition.theme}
              isDay
            />

            <div className="flex items-center gap-3 sm:min-w-0">
              <span className="text-current/60">{day.min}°</span>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/14">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white/70"
                  style={{
                    width: `${Math.max(day.max - day.min, 10) * 5}%`,
                  }}
                />
              </div>
              <span className="font-semibold">{day.max}°</span>
            </div>

            <span className="text-sm text-current/60 sm:text-right">
              {day.precipitationSum} {precipitationUnit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
