import type { WeatherTheme } from "@/types/weather";

export type WeatherSurfaceTheme = {
  shell: string;
  halo: string;
  panel: string;
  chip: string;
};

// Centralized visual theme tokens keep weather styling consistent across sections.
export const weatherSurfaceThemes: Record<WeatherTheme, WeatherSurfaceTheme> = {
  clear: {
    shell:
      "from-[#fff6dd] via-[#f8d790] to-[#ee9d52] text-slate-950 dark:from-[#1c2234] dark:via-[#5e4727] dark:to-[#281f26] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.88),_transparent_52%)]",
    panel: "border-white/35 bg-white/60 dark:border-white/10 dark:bg-white/10",
    chip: "bg-slate-950 text-amber-50 dark:bg-white dark:text-slate-950",
  },
  cloudy: {
    shell:
      "from-[#e7edf5] via-[#b8c3d2] to-[#6b7a92] text-slate-950 dark:from-[#111c2c] dark:via-[#384a64] dark:to-[#1b2432] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.72),_transparent_54%)]",
    panel: "border-white/25 bg-white/36 dark:border-white/10 dark:bg-white/10",
    chip: "bg-slate-950 text-slate-100 dark:bg-white dark:text-slate-950",
  },
  rain: {
    shell:
      "from-[#dcecff] via-[#89abd0] to-[#2f4f77] text-slate-950 dark:from-[#0a1420] dark:via-[#23476c] dark:to-[#071421] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(173,216,255,0.52),_transparent_58%)]",
    panel: "border-white/20 bg-white/30 dark:border-white/15 dark:bg-white/12",
    chip: "bg-slate-950 text-white dark:bg-white dark:text-slate-900",
  },
  storm: {
    shell: "from-[#20253a] via-[#37405f] to-[#050916] text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(114,137,255,0.22),_transparent_60%)]",
    panel: "border-white/10 bg-white/10",
    chip: "bg-amber-200 text-slate-950",
  },
  snow: {
    shell:
      "from-[#f8fcff] via-[#d8e7f1] to-[#9ab2c5] text-slate-950 dark:from-[#15212d] dark:via-[#51697a] dark:to-[#202836] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_54%)]",
    panel: "border-white/35 bg-white/55 dark:border-white/10 dark:bg-white/10",
    chip: "bg-slate-950 text-white dark:bg-white dark:text-slate-950",
  },
  mist: {
    shell:
      "from-[#ebedf2] via-[#c3c7cf] to-[#707784] text-slate-950 dark:from-[#141820] dark:via-[#4a5161] dark:to-[#212633] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.82),_transparent_52%)]",
    panel: "border-white/28 bg-white/42 dark:border-white/10 dark:bg-white/10",
    chip: "bg-slate-950 text-white dark:bg-white dark:text-slate-950",
  },
  night: {
    shell: "from-[#07111f] via-[#17304f] to-[#0b1a2e] text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(112,160,255,0.24),_transparent_56%)]",
    panel: "border-white/10 bg-white/10",
    chip: "bg-white text-slate-950",
  },
};
