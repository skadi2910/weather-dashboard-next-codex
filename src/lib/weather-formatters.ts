import type { UnitSystem } from "@/types/weather";

export function formatLocalTime(
  dateString: string,
  timezone: string,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    ...options,
  }).format(new Date(dateString));
}

export function getTemperatureUnit(unit: UnitSystem) {
  return unit === "imperial" ? "F" : "C";
}

export function getWindUnit(unit: UnitSystem) {
  return unit === "imperial" ? "mph" : "km/h";
}

export function getPrecipitationUnit(unit: UnitSystem) {
  return unit === "imperial" ? "in" : "mm";
}

function getVisibilityUnit(unit: UnitSystem) {
  return unit === "imperial" ? "mi" : "km";
}

function convertVisibility(kilometers: number, unit: UnitSystem) {
  return unit === "imperial"
    ? Math.round(kilometers * 0.621371)
    : kilometers;
}

export function getVisibilityDisplay(visibility: number, unit: UnitSystem) {
  return {
    value: convertVisibility(visibility, unit),
    unit: getVisibilityUnit(unit),
  };
}

export function buildUnitHref(query: string, unit: UnitSystem) {
  const params = new URLSearchParams({
    q: query,
    unit,
  });

  return `/?${params.toString()}`;
}
