import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudSnow,
  CloudSun,
  MoonStar,
  Sun,
} from "lucide-react";

import type { WeatherTheme } from "@/types/weather";

type WeatherGlyphProps = {
  theme: WeatherTheme;
  isDay: boolean;
  className?: string;
};

export function WeatherGlyph({
  theme,
  isDay,
  className,
}: WeatherGlyphProps) {
  if (theme === "clear") {
    return <Sun className={className} strokeWidth={1.75} />;
  }

  if (theme === "cloudy") {
    return isDay ? (
      <CloudSun className={className} strokeWidth={1.75} />
    ) : (
      <CloudMoon className={className} strokeWidth={1.75} />
    );
  }

  if (theme === "rain") {
    return <CloudDrizzle className={className} strokeWidth={1.75} />;
  }

  if (theme === "storm") {
    return <CloudLightning className={className} strokeWidth={1.75} />;
  }

  if (theme === "snow") {
    return <CloudSnow className={className} strokeWidth={1.75} />;
  }

  if (theme === "mist") {
    return <CloudFog className={className} strokeWidth={1.75} />;
  }

  if (theme === "night") {
    return <MoonStar className={className} strokeWidth={1.75} />;
  }

  return <Cloud className={className} strokeWidth={1.75} />;
}
