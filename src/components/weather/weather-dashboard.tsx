import { DashboardHeader } from "@/components/weather/dashboard-header";
import { CurrentOverview } from "@/components/weather/current-overview";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
import { WeeklyOverview } from "@/components/weather/weekly-overview";
import { AtmospherePanels } from "@/components/weather/atmosphere-panels";
import { weatherSurfaceThemes } from "@/lib/weather-theme";
import type { WeatherPayload } from "@/types/weather";
import { cn } from "@/lib/utils";

type WeatherDashboardProps = {
  data: WeatherPayload;
  query: string;
  error?: string;
};

export function WeatherDashboard({
  data,
  query,
  error,
}: WeatherDashboardProps) {
  const theme = weatherSurfaceThemes[data.current.condition.theme];

  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden bg-linear-to-br px-4 py-5 transition-colors duration-500 sm:px-6 lg:px-8",
        theme.shell,
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0", theme.halo)} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0))] dark:bg-[linear-gradient(135deg,rgba(126,92,255,0.1),transparent_32%,rgba(0,0,0,0.26))]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="grid gap-4 rounded-[1.75rem] border border-slate-900/8 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/8 dark:bg-[#060b14] dark:shadow-[0_24px_80px_rgba(0,0,0,0.42)] md:rounded-[2rem] lg:grid-cols-[1.45fr_0.85fr] lg:p-6">
          <div className="flex flex-col gap-6">
            <DashboardHeader
              data={data}
              query={query}
              chipClassName={theme.chip}
            />

            {error ? (
              <p className="rounded-2xl border border-amber-200/40 bg-amber-100/20 px-4 py-3 text-sm text-current">
                {error}
              </p>
            ) : null}

            <CurrentOverview data={data} />
          </div>

          <HourlyForecast data={data} panelClassName={theme.panel} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <WeeklyOverview data={data} />
          <AtmospherePanels data={data} />
        </section>
      </div>
    </main>
  );
}
