import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useOficiant, useOficiantCategories } from "@/hooks/useOficiant";
import { ItemCard } from "@/components/ItemCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Package } from "lucide-react";

export const Route = createFileRoute("/oficiant")({
  component: OficiantPage,
});

function OficiantPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: items = [], isLoading } = useOficiant();
  const { data: categories = [], isLoading: categoriesLoading } = useOficiantCategories();

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
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
          <Package className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">Офіцінат</h1>
          <p className="text-muted-foreground">
            Предмети для імпровізаційних сцен — {items.length} об'єктів
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
          <Package className="mb-4 h-12 w-12 text-muted-foreground/40" />
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
                tag={item.trait}
                tagLabel="Властивість"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
