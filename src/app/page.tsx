import { WeatherDashboard } from "@/components/weather/weather-dashboard";
import { getFallbackWeatherPayload } from "@/lib/weather-fallback";
import {
  getDefaultQuery,
  getWeatherPayload,
  getWeatherPayloadForLocation,
} from "@/lib/weather";
import type { LocationResult, UnitSystem } from "@/types/weather";

type PageProps = {
  searchParams?: Promise<{
    q?: string;
    unit?: string;
    name?: string;
    country?: string;
    admin1?: string;
    lat?: string;
    lon?: string;
    tz?: string;
  }>;
};

function getSelectedLocation(
  params: Awaited<PageProps["searchParams"]>,
): LocationResult | undefined {
  if (!params?.name || !params.country || !params.lat || !params.lon || !params.tz) {
    return undefined;
  }

  const latitude = Number(params.lat);
  const longitude = Number(params.lon);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return undefined;
  }

  return {
    name: params.name,
    country: params.country,
    admin1: params.admin1,
    latitude,
    longitude,
    timezone: params.tz,
  };
}

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim() || getDefaultQuery();
  const unit: UnitSystem = params.unit === "imperial" ? "imperial" : "metric";
  const selectedLocation = getSelectedLocation(params);
  let data: Awaited<ReturnType<typeof getWeatherPayload>>;
  let error: string | undefined;

  try {
    data = selectedLocation
      ? await getWeatherPayloadForLocation(selectedLocation, unit)
      : await getWeatherPayload(query, unit);
  } catch (caughtError) {
    const fallbackQuery = getDefaultQuery();
    try {
      data = await getWeatherPayload(fallbackQuery, unit);
      error =
        caughtError instanceof Error
          ? `${caughtError.message} Showing ${fallbackQuery} instead.`
          : `Something went wrong. Showing ${fallbackQuery} instead.`;
    } catch {
      data = getFallbackWeatherPayload();
      error =
        caughtError instanceof Error
          ? `${caughtError.message} Live weather is unavailable, so a local sample forecast is being shown.`
          : "Live weather is unavailable, so a local sample forecast is being shown.";
    }
  }

  return <WeatherDashboard data={data} error={error} query={query} />;
}
