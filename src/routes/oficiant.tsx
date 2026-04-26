import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useOficiant, useOficiantCategories } from "@/hooks/useOficiant";
import type { Oficiant } from "@/hooks/useOficiant";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Package, Shuffle, Tag } from "lucide-react";

export const Route = createFileRoute("/oficiant")({
  component: OficiantPage,
});

function WaiterIllustration() {
  return (
    <svg
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-36 w-auto shrink-0 select-none"
    >
      {/* Customer (left) */}
      <circle cx="65" cy="55" r="20" fill="#94a3b8" fillOpacity="0.3" />
      <path d="M45 50 Q65 30 85 50" fill="#64748b" fillOpacity="0.18" />
      <rect x="45" y="77" width="40" height="46" rx="10" fill="#94a3b8" fillOpacity="0.2" />
      <path
        d="M85 88 Q106 85 108 97"
        stroke="#94a3b8"
        strokeOpacity="0.3"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M45 90 Q26 97 22 110"
        stroke="#94a3b8"
        strokeOpacity="0.22"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M57 123 L51 148"
        stroke="#94a3b8"
        strokeOpacity="0.18"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M73 123 L79 148"
        stroke="#94a3b8"
        strokeOpacity="0.18"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Table */}
      <rect x="108" y="100" width="64" height="10" rx="5" fill="#94a3b8" fillOpacity="0.28" />
      <rect x="132" y="110" width="16" height="32" rx="4" fill="#94a3b8" fillOpacity="0.18" />
      <rect x="122" y="140" width="36" height="8" rx="4" fill="#94a3b8" fillOpacity="0.18" />
      {/* Wine glass */}
      <path d="M134 100 L130 86 L138 86 Z" fill="#94a3b8" fillOpacity="0.14" />
      <rect x="133" y="78" width="6" height="8" rx="1" fill="#94a3b8" fillOpacity="0.12" />
      <path d="M128 78 Q136 66 144 78" fill="#94a3b8" fillOpacity="0.1" />

      {/* Waiter (right) */}
      <circle cx="215" cy="50" r="20" fill="#94a3b8" fillOpacity="0.3" />
      <path d="M208 70 L215 75 L222 70 L215 65 Z" fill="#64748b" fillOpacity="0.38" />
      <rect x="195" y="72" width="40" height="52" rx="10" fill="#94a3b8" fillOpacity="0.2" />
      <rect x="202" y="78" width="26" height="40" rx="7" fill="#94a3b8" fillOpacity="0.1" />
      <path
        d="M195 82 L168 54"
        stroke="#94a3b8"
        strokeOpacity="0.3"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <ellipse cx="162" cy="49" rx="22" ry="6" fill="#94a3b8" fillOpacity="0.38" />
      <ellipse cx="160" cy="44" rx="12" ry="4" fill="#94a3b8" fillOpacity="0.2" />
      <path d="M148 44 Q160 32 172 44" fill="#94a3b8" fillOpacity="0.14" />
      <path
        d="M235 85 Q254 94 256 108"
        stroke="#94a3b8"
        strokeOpacity="0.22"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M207 124 L202 148"
        stroke="#94a3b8"
        strokeOpacity="0.18"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M223 124 L228 148"
        stroke="#94a3b8"
        strokeOpacity="0.18"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Speech bubbles */}
      <rect x="78" y="22" width="36" height="20" rx="10" fill="#94a3b8" fillOpacity="0.14" />
      <circle cx="84" cy="44" r="3" fill="#94a3b8" fillOpacity="0.1" />
      <circle cx="78" cy="50" r="2" fill="#94a3b8" fillOpacity="0.08" />
      <text x="96" y="36" textAnchor="middle" fontSize="9" fill="#64748b" fillOpacity="0.4">
        . . .
      </text>
      <rect x="168" y="14" width="36" height="20" rx="10" fill="#94a3b8" fillOpacity="0.14" />
      <circle cx="198" cy="36" r="3" fill="#94a3b8" fillOpacity="0.1" />
      <circle cx="204" cy="42" r="2" fill="#94a3b8" fillOpacity="0.08" />
      <text x="186" y="28" textAnchor="middle" fontSize="9" fill="#64748b" fillOpacity="0.4">
        . . .
      </text>
    </svg>
  );
}

function OficiantPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [picked, setPicked] = useState<Oficiant | null>(null);

  const { data: items = [], isLoading } = useOficiant();
  const { data: categories = [], isLoading: categoriesLoading } = useOficiantCategories();

  function pickRandom() {
    if (items.length === 0) return;
    const next = items[Math.floor(Math.random() * items.length)];
    setPicked(next);
  }

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = search === "" || item.name.toLowerCase().includes(search.toLowerCase());
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

      <div className="mb-6">
        <div className="mb-4 overflow-hidden rounded-2xl border bg-gradient-to-br from-muted/60 to-muted/20">
          <div className="flex items-stretch">
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Випадковий предмет
                </span>
                {picked ? (
                  <div className="mb-4">
                    <p className="text-2xl font-bold leading-tight text-foreground">
                      {picked.name}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-xs font-medium shadow-sm">
                        {picked.category}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        <Tag className="h-3 w-3" />
                        {picked.trait}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="mb-4 text-sm text-muted-foreground">
                    Натисніть кнопку, щоб отримати випадковий предмет для сцени
                  </p>
                )}
              </div>
              <Button
                onClick={pickRandom}
                disabled={isLoading}
                size="sm"
                className="w-fit min-w-32 gap-1.5"
              >
                {picked ? "Ще раз" : "Обрати предмет"}
              </Button>
            </div>
            <div className="flex items-end justify-end pr-4 pb-2">
              <WaiterIllustration />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
            disabled={categoriesLoading}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />
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
          <div className="rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground w-12">#</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Назва</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Категорія
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Властивість
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="px-4 py-3 text-muted-foreground">{item.id}</td>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.trait}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
