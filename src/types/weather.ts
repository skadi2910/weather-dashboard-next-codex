export type UnitSystem = "metric" | "imperial";

export type WeatherTheme =
  | "clear"
  | "cloudy"
  | "rain"
  | "storm"
  | "snow"
  | "mist"
  | "night";

export type WeatherCondition = {
  code: number;
  label: string;
  theme: WeatherTheme;
};

export type LocationResult = {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type CurrentWeather = {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  windSpeed: number;
  uvIndex: number;
  visibility: number;
  pressure: number;
  isDay: boolean;
  condition: WeatherCondition;
};

export type HourlyForecastItem = {
  time: string;
  temperature: number;
  precipitationProbability: number;
  condition: WeatherCondition;
  isDay: boolean;
};

export type DailyForecastItem = {
  date: string;
  min: number;
  max: number;
  precipitationSum: number;
  sunrise: string;
  sunset: string;
  condition: WeatherCondition;
};

export type WeatherPayload = {
  location: LocationResult;
  unit: UnitSystem;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
};
