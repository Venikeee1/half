import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useLocations, useCategories } from "@/hooks/useLocations";
import { LocationCard } from "@/components/LocationCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/lokatsii")({
  component: LokatsiiPage,
});

function LokatsiiPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: locations = [], isLoading: locationsLoading } = useLocations();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const filtered = useMemo(() => {
    return locations.filter((loc) => {
      const matchesSearch =
        search === "" || loc.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || loc.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [locations, search, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">Локації</h1>
          <p className="text-muted-foreground">
            Місця де відбувається дія — {locations.length} локацій для імпровізації
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
          disabled={categoriesLoading}
        />
      </div>

      {locationsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MapPin className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium">Нічого не знайдено</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Спробуйте змінити пошуковий запит або фільтр категорій
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Показано {filtered.length} з {locations.length}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
