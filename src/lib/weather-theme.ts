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
      "from-[#f7f7f8] via-[#f3f4f6] to-[#eceef2] text-slate-950 dark:from-[#171225] dark:via-[#111827] dark:to-[#0a101b] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(128,90,255,0.22),_transparent_52%)]",
    panel: "border-slate-950/8 bg-white dark:border-white/10 dark:bg-white/6",
    chip: "bg-slate-950 text-white dark:bg-primary dark:text-white",
  },
  cloudy: {
    shell:
      "from-[#f7f7f8] via-[#f1f3f6] to-[#e8ebf0] text-slate-950 dark:from-[#141827] dark:via-[#1a2130] dark:to-[#0b1220] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(125,138,165,0.18),_transparent_54%)]",
    panel: "border-slate-950/8 bg-white dark:border-white/10 dark:bg-white/6",
    chip: "bg-slate-950 text-white dark:bg-primary dark:text-white",
  },
  rain: {
    shell:
      "from-[#f7f7f8] via-[#eff2f6] to-[#e7ebf1] text-slate-950 dark:from-[#0c1421] dark:via-[#18273f] dark:to-[#0a111d] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.46),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(94,134,205,0.2),_transparent_58%)]",
    panel: "border-slate-950/8 bg-white dark:border-white/10 dark:bg-white/6",
    chip: "bg-slate-950 text-white dark:bg-primary dark:text-white",
  },
  storm: {
    shell: "from-[#f7f7f8] via-[#eef1f5] to-[#e5e9ef] text-slate-950 dark:from-[#16111f] dark:via-[#1d1c31] dark:to-[#090e18] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.44),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(121,74,255,0.24),_transparent_58%)]",
    panel: "border-slate-950/8 bg-white dark:border-white/10 dark:bg-white/6",
    chip: "bg-slate-950 text-white dark:bg-accent dark:text-accent-foreground",
  },
  snow: {
    shell:
      "from-[#f7f7f8] via-[#f4f5f7] to-[#eceef2] text-slate-950 dark:from-[#171c2a] dark:via-[#243344] dark:to-[#101826] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(206,224,255,0.15),_transparent_54%)]",
    panel: "border-slate-950/8 bg-white dark:border-white/10 dark:bg-white/6",
    chip: "bg-slate-950 text-white dark:bg-primary dark:text-white",
  },
  mist: {
    shell:
      "from-[#f7f7f8] via-[#f2f3f5] to-[#e8eaed] text-slate-950 dark:from-[#15181f] dark:via-[#22262d] dark:to-[#10141c] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.48),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(164,177,201,0.14),_transparent_52%)]",
    panel: "border-slate-950/8 bg-white dark:border-white/10 dark:bg-white/6",
    chip: "bg-slate-950 text-white dark:bg-primary dark:text-white",
  },
  night: {
    shell: "from-[#f7f7f8] via-[#eff2f6] to-[#e8ecf3] text-slate-950 dark:from-[#09101b] dark:via-[#101827] dark:to-[#050913] dark:text-white",
    halo: "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.46),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(121,74,255,0.18),_transparent_56%)]",
    panel: "border-slate-950/8 bg-white dark:border-white/10 dark:bg-white/6",
    chip: "bg-slate-950 text-white dark:bg-primary dark:text-white",
  },
};
