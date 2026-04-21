import { useQuery } from "@tanstack/react-query";
import oficiantData from "@/data/oficiant.json";

export interface Oficiant {
  id: number;
  name: string;
  category: string;
  trait: string;
}

async function fetchOficiant(): Promise<Oficiant[]> {
  await new Promise((r) => setTimeout(r, 150));
  return oficiantData.oficiant as Oficiant[];
}

export function useOficiant() {
  return useQuery({
    queryKey: ["oficiant"],
    queryFn: fetchOficiant,
    staleTime: Infinity,
  });
}

export function useOficiantCategories() {
  return useQuery({
    queryKey: ["oficiant-categories"],
    queryFn: async () => {
      const items = await fetchOficiant();
      return [...new Set(items.map((i) => i.category))].sort();
    },
    staleTime: Infinity,
  });
}
