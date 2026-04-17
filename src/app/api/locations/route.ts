import { NextResponse } from "next/server";

import { searchLocations } from "@/lib/weather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  try {
    const results = await searchLocations(query);

    return NextResponse.json({
      results: results.map((location) => ({
        ...location,
        label: location.admin1
          ? `${location.name}, ${location.admin1}, ${location.country}`
          : `${location.name}, ${location.country}`,
      })),
    });
  } catch {
    return NextResponse.json({
      results: [],
      error: "Unable to fetch city suggestions right now.",
    });
  }
}
