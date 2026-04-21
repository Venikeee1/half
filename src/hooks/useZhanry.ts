import { useQuery } from "@tanstack/react-query";
import zhanryData from "@/data/zhanry.json";

export interface Zhanr {
  id: number;
  name: string;
  category: string;
  mood: string;
}

async function fetchZhanry(): Promise<Zhanr[]> {
  await new Promise((r) => setTimeout(r, 150));
  return zhanryData.zhanry as Zhanr[];
}

export function useZhanry() {
  return useQuery({
    queryKey: ["zhanry"],
    queryFn: fetchZhanry,
    staleTime: Infinity,
  });
}

export function useZhanryCategories() {
  return useQuery({
    queryKey: ["zhanry-categories"],
    queryFn: async () => {
      const items = await fetchZhanry();
      return [...new Set(items.map((i) => i.category))].sort();
    },
    staleTime: Infinity,
  });
}
