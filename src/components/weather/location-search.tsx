"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { UnitSystem } from "@/types/weather";

type Suggestion = {
  label: string;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

type LocationSearchProps = {
  initialQuery: string;
  unit: UnitSystem;
};

function buildSearchUrl(query: string, unit: UnitSystem) {
  return `/?q=${encodeURIComponent(query)}&unit=${unit}`;
}

function buildLocationUrl(suggestion: Suggestion, unit: UnitSystem) {
  const params = new URLSearchParams({
    q: suggestion.name,
    unit,
    name: suggestion.name,
    country: suggestion.country,
    lat: String(suggestion.latitude),
    lon: String(suggestion.longitude),
    tz: suggestion.timezone,
  });

  if (suggestion.admin1) {
    params.set("admin1", suggestion.admin1);
  }

  return `/?${params.toString()}`;
}

function getSuggestionKey(suggestion: Suggestion) {
  return [
    suggestion.name,
    suggestion.admin1 ?? "",
    suggestion.country,
    suggestion.latitude,
    suggestion.longitude,
  ].join(":");
}

export function LocationSearch({
  initialQuery,
  unit,
}: LocationSearchProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = deferredQuery.trim();

    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchSuggestions() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/locations?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );
        const data = (await response.json()) as { results?: Suggestion[] };

        setSuggestions(data.results ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSuggestions();

    return () => {
      controller.abort();
    };
  }, [deferredQuery]);

  function goToSearch(nextQuery: string) {
    const searchQuery = nextQuery.trim();

    if (!searchQuery) {
      return;
    }

    startTransition(() => {
      router.push(buildSearchUrl(searchQuery, unit));
    });
    setIsOpen(false);
  }

  function goToSuggestion(suggestion: Suggestion) {
    startTransition(() => {
      router.push(buildLocationUrl(suggestion, unit));
    });
    setQuery(suggestion.label);
    setIsOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        action={() => goToSearch(query)}
        className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-current/50" />
          <Input
            aria-label="Search city"
            autoComplete="off"
            className="h-12 rounded-full border-white/20 bg-black/10 pl-11 text-base text-current placeholder:text-current/45 backdrop-blur-md dark:border-white/15 dark:bg-white/10"
            name="q"
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            placeholder="Search city or region"
            value={query}
          />
          {isLoading ? (
            <LoaderCircle className="absolute top-1/2 right-4 size-4 -translate-y-1/2 animate-spin text-current/55" />
          ) : null}
        </div>
        <Button className="h-12 w-full rounded-full px-6 sm:w-auto">Find Weather</Button>
      </form>

      {isOpen && (suggestions.length > 0 || query.trim().length >= 2) ? (
        <div className="absolute z-20 mt-3 w-full overflow-hidden rounded-[1.25rem] border border-slate-950/10 bg-white/92 p-2 text-slate-950 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/15 dark:bg-slate-950/88 dark:text-white dark:shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
          {suggestions.length > 0 ? (
            <div className="flex flex-col gap-1">
              {suggestions.map((suggestion) => (
                <button
                  key={getSuggestionKey(suggestion)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left transition hover:bg-slate-950/6",
                    "focus-visible:bg-slate-950/6 focus-visible:outline-none dark:hover:bg-white/10 dark:focus-visible:bg-white/10",
                  )}
                  onClick={() => goToSuggestion(suggestion)}
                  type="button"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-current/55" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {suggestion.label}
                      </p>
                      <p className="truncate text-xs text-current/55">
                        Search weather for this city
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-[1rem] px-4 py-3 text-sm text-current/65">
              No matching cities found yet.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
