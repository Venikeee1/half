import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useZhanry, useZhanryCategories } from "@/hooks/useZhanry";
import { ItemCard } from "@/components/ItemCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Clapperboard } from "lucide-react";

export const Route = createFileRoute("/zhanry")({
  component: ZhanryPage,
});

function ZhanryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: items = [], isLoading } = useZhanry();
  const { data: categories = [], isLoading: categoriesLoading } = useZhanryCategories();

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        search === "" || item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Clapperboard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">Жанри</h1>
          <p className="text-muted-foreground">
            Жанри та стилі для імпровізаційних сцен — {items.length} жанрів
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

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Clapperboard className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium">Нічого не знайдено</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Спробуйте змінити пошуковий запит або фільтр категорій
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Показано {filtered.length} з {items.length}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                tag={item.mood}
                tagLabel="Настрій"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
