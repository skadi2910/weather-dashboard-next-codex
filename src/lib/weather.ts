import type {
  DailyForecastItem,
  HourlyForecastItem,
  LocationResult,
  UnitSystem,
  WeatherCondition,
  WeatherPayload,
} from "@/types/weather";
import { Agent, get } from "node:https";
import { lookup } from "node:dns";

const DEFAULT_QUERY = "Ho Chi Minh City";
const IPV4_AGENT = new Agent({
  family: 4,
  lookup,
});

type GeocodingResponse = {
  results?: Array<{
    id?: number;
    name: string;
    country: string;
    admin1?: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }>;
};

type ForecastResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation_probability: number;
    wind_speed_10m: number;
    uv_index: number;
    visibility: number;
    surface_pressure: number;
    is_day: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
    is_day: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    sunrise: string[];
    sunset: string[];
  };
};

function buildWeatherUrl(baseUrl: string, params: URLSearchParams) {
  return `${baseUrl}?${params.toString()}`;
}

function getWeatherCondition(code: number, isDay: boolean): WeatherCondition {
  if (code === 0) {
    return {
      code,
      label: isDay ? "Clear sky" : "Clear night",
      theme: isDay ? "clear" : "night",
    };
  }

  if ([1, 2].includes(code)) {
    return {
      code,
      label: isDay ? "Partly cloudy" : "Clouds tonight",
      theme: isDay ? "cloudy" : "night",
    };
  }

  if (code === 3) {
    return { code, label: "Overcast", theme: "cloudy" };
  }

  if ([45, 48].includes(code)) {
    return { code, label: "Foggy", theme: "mist" };
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) {
    return { code, label: "Rain showers", theme: "rain" };
  }

  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) {
    return { code, label: "Snow", theme: "snow" };
  }

  if ([95, 96, 99].includes(code)) {
    return { code, label: "Thunderstorm", theme: "storm" };
  }

  return { code, label: "Variable weather", theme: isDay ? "cloudy" : "night" };
}

function getUnitParams(unit: UnitSystem) {
  if (unit === "imperial") {
    return {
      temperature: "fahrenheit",
      wind: "mph",
      precipitation: "inch",
    };
  }

  return {
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  };
}

async function requestJson<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    const request = get(url, { agent: IPV4_AGENT }, (response) => {
      if (!response.statusCode) {
        reject(new Error("Weather service returned no status code."));
        return;
      }

      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume();
        reject(
          new Error(`Weather service returned status ${response.statusCode}.`),
        );
        return;
      }

      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        try {
          resolve(JSON.parse(body) as T);
        } catch {
          reject(new Error("Weather service returned invalid JSON."));
        }
      });
    });

    request.on("error", (error) => {
      reject(error);
    });
  });
}

async function geocodeLocation(query: string): Promise<LocationResult> {
  const params = new URLSearchParams({
    name: query || DEFAULT_QUERY,
    count: "1",
    language: "en",
    format: "json",
  });

  const data = await requestJson<GeocodingResponse>(
    buildWeatherUrl("https://geocoding-api.open-meteo.com/v1/search", params),
  );
  const location = data.results?.[0];

  if (!location) {
    throw new Error(`No weather results found for "${query}".`);
  }

  return {
    name: location.name,
    country: location.country,
    admin1: location.admin1,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone,
  };
}

async function fetchForecast(location: LocationResult, unit: UnitSystem) {
  const unitParams = getUnitParams(unit);
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,wind_speed_10m,uv_index,visibility,surface_pressure,is_day,weather_code",
    hourly: "temperature_2m,precipitation_probability,weather_code,is_day",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset",
    forecast_days: "7",
    timezone: location.timezone,
    temperature_unit: unitParams.temperature,
    wind_speed_unit: unitParams.wind,
    precipitation_unit: unitParams.precipitation,
  });

  return requestJson<ForecastResponse>(
    buildWeatherUrl("https://api.open-meteo.com/v1/forecast", params),
  );
}

function createHourlyForecast(data: ForecastResponse): HourlyForecastItem[] {
  const startIndex = data.hourly.time.findIndex((time) => time === data.current.time);
  const sliceStart = startIndex === -1 ? 0 : startIndex;

  return data.hourly.time.slice(sliceStart, sliceStart + 8).map((time, index) => {
    const actualIndex = sliceStart + index;
    const isDay = data.hourly.is_day[actualIndex] === 1;

    return {
      time,
      temperature: Math.round(data.hourly.temperature_2m[actualIndex]),
      precipitationProbability: Math.round(
        data.hourly.precipitation_probability[actualIndex],
      ),
      condition: getWeatherCondition(data.hourly.weather_code[actualIndex], isDay),
      isDay,
    };
  });
}

function createDailyForecast(data: ForecastResponse): DailyForecastItem[] {
  return data.daily.time.map((date, index) => ({
    date,
    min: Math.round(data.daily.temperature_2m_min[index]),
    max: Math.round(data.daily.temperature_2m_max[index]),
    precipitationSum: Math.round(data.daily.precipitation_sum[index]),
    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],
    condition: getWeatherCondition(data.daily.weather_code[index], true),
  }));
}

export async function getWeatherPayloadForLocation(
  location: LocationResult,
  unit: UnitSystem,
): Promise<WeatherPayload> {
  const forecast = await fetchForecast(location, unit);
  const currentCondition = getWeatherCondition(
    forecast.current.weather_code,
    forecast.current.is_day === 1,
  );

  return {
    location,
    unit,
    current: {
      time: forecast.current.time,
      temperature: Math.round(forecast.current.temperature_2m),
      apparentTemperature: Math.round(forecast.current.apparent_temperature),
      humidity: Math.round(forecast.current.relative_humidity_2m),
      precipitationProbability: Math.round(
        forecast.current.precipitation_probability,
      ),
      windSpeed: Math.round(forecast.current.wind_speed_10m),
      uvIndex: Math.round(forecast.current.uv_index),
      visibility: Math.round(forecast.current.visibility / 1000),
      pressure: Math.round(forecast.current.surface_pressure),
      isDay: forecast.current.is_day === 1,
      condition: currentCondition,
    },
    hourly: createHourlyForecast(forecast),
    daily: createDailyForecast(forecast),
  };
}

export async function getWeatherPayload(
  query: string,
  unit: UnitSystem,
): Promise<WeatherPayload> {
  const location = await geocodeLocation(query || DEFAULT_QUERY);

  return getWeatherPayloadForLocation(location, unit);
}

export function getDefaultQuery() {
  return DEFAULT_QUERY;
}

export async function searchLocations(query: string): Promise<LocationResult[]> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: trimmedQuery,
    count: "6",
    language: "en",
    format: "json",
  });

  const data = await requestJson<GeocodingResponse>(
    buildWeatherUrl("https://geocoding-api.open-meteo.com/v1/search", params),
  );

  return (
    data.results?.map((location) => ({
      name: location.name,
      country: location.country,
      admin1: location.admin1,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
    })) ?? []
  );
}
