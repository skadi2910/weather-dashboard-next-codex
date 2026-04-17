import type { WeatherPayload } from "@/types/weather";

function shiftIsoHours(baseDate: string, hours: number) {
  const date = new Date(baseDate);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
}

function shiftIsoDays(baseDate: string, days: number) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function getFallbackWeatherPayload(): WeatherPayload {
  const now = "2026-04-16T18:00:00.000Z";

  return {
    location: {
      name: "Ho Chi Minh City",
      country: "Vietnam",
      admin1: "Ho Chi Minh",
      latitude: 10.8231,
      longitude: 106.6297,
      timezone: "Asia/Ho_Chi_Minh",
    },
    unit: "metric",
    current: {
      time: now,
      temperature: 31,
      apparentTemperature: 36,
      humidity: 74,
      precipitationProbability: 35,
      windSpeed: 14,
      uvIndex: 6,
      visibility: 10,
      pressure: 1008,
      isDay: true,
      condition: {
        code: 2,
        label: "Partly cloudy",
        theme: "cloudy",
      },
    },
    hourly: [
      { time: shiftIsoHours(now, 0), temperature: 31, precipitationProbability: 35, isDay: true, condition: { code: 2, label: "Partly cloudy", theme: "cloudy" } },
      { time: shiftIsoHours(now, 1), temperature: 30, precipitationProbability: 42, isDay: true, condition: { code: 3, label: "Overcast", theme: "cloudy" } },
      { time: shiftIsoHours(now, 2), temperature: 29, precipitationProbability: 48, isDay: false, condition: { code: 61, label: "Rain showers", theme: "rain" } },
      { time: shiftIsoHours(now, 3), temperature: 28, precipitationProbability: 55, isDay: false, condition: { code: 61, label: "Rain showers", theme: "rain" } },
      { time: shiftIsoHours(now, 4), temperature: 28, precipitationProbability: 40, isDay: false, condition: { code: 2, label: "Clouds tonight", theme: "night" } },
      { time: shiftIsoHours(now, 5), temperature: 27, precipitationProbability: 24, isDay: false, condition: { code: 1, label: "Clouds tonight", theme: "night" } },
      { time: shiftIsoHours(now, 6), temperature: 27, precipitationProbability: 18, isDay: false, condition: { code: 0, label: "Clear night", theme: "night" } },
      { time: shiftIsoHours(now, 7), temperature: 28, precipitationProbability: 16, isDay: true, condition: { code: 1, label: "Partly cloudy", theme: "cloudy" } },
    ],
    daily: [
      { date: shiftIsoDays(now, 0), min: 27, max: 33, precipitationSum: 3, sunrise: "2026-04-16T22:41:00.000Z", sunset: "2026-04-17T10:58:00.000Z", condition: { code: 2, label: "Partly cloudy", theme: "cloudy" } },
      { date: shiftIsoDays(now, 1), min: 27, max: 34, precipitationSum: 7, sunrise: "2026-04-17T22:40:00.000Z", sunset: "2026-04-18T10:58:00.000Z", condition: { code: 61, label: "Rain showers", theme: "rain" } },
      { date: shiftIsoDays(now, 2), min: 26, max: 32, precipitationSum: 9, sunrise: "2026-04-18T22:40:00.000Z", sunset: "2026-04-19T10:58:00.000Z", condition: { code: 95, label: "Thunderstorm", theme: "storm" } },
      { date: shiftIsoDays(now, 3), min: 26, max: 31, precipitationSum: 5, sunrise: "2026-04-19T22:39:00.000Z", sunset: "2026-04-20T10:57:00.000Z", condition: { code: 3, label: "Overcast", theme: "cloudy" } },
      { date: shiftIsoDays(now, 4), min: 27, max: 33, precipitationSum: 2, sunrise: "2026-04-20T22:39:00.000Z", sunset: "2026-04-21T10:57:00.000Z", condition: { code: 1, label: "Partly cloudy", theme: "cloudy" } },
      { date: shiftIsoDays(now, 5), min: 27, max: 34, precipitationSum: 1, sunrise: "2026-04-21T22:38:00.000Z", sunset: "2026-04-22T10:57:00.000Z", condition: { code: 0, label: "Clear sky", theme: "clear" } },
      { date: shiftIsoDays(now, 6), min: 28, max: 35, precipitationSum: 0, sunrise: "2026-04-22T22:38:00.000Z", sunset: "2026-04-23T10:56:00.000Z", condition: { code: 0, label: "Clear sky", theme: "clear" } },
    ],
  };
}
