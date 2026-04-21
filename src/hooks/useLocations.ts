import { useQuery } from "@tanstack/react-query";
import type { Location } from "@/types/location";
import locationsData from "../../locations.json";

async function fetchLocations(): Promise<Location[]> {
  await new Promise((r) => setTimeout(r, 150));
  return locationsData.locations as Location[];
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: Infinity,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const locations = await fetchLocations();
      const categories = [...new Set(locations.map((l) => l.category))].sort();
      return categories;
    },
    staleTime: Infinity,
  });
}
