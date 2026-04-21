import { createFileRoute, Link } from "@tanstack/react-router";
import { useLocations } from "@/hooks/useLocations";
import { useOficiant } from "@/hooks/useOficiant";
import { useZhanry } from "@/hooks/useZhanry";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Package, Clapperboard, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

interface CategoryCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number | undefined;
  countLabel: string;
  accentClass: string;
  stats: { label: string; value: string }[];
}

function CategoryCard({
  to,
  icon,
  title,
  description,
  count,
  countLabel,
  accentClass,
  stats,
}: CategoryCardProps) {
  return (
    <Link to={to} className="group block">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-6">
          <div className={`mb-5 inline-flex rounded-xl p-3 ${accentClass}`}>{icon}</div>

          <h2 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{description}</p>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/60 px-3 py-2.5">
              <p className="text-2xl font-bold tabular-nums">
                {count ?? <span className="inline-block h-7 w-10 animate-pulse rounded bg-muted" />}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{countLabel}</p>
            </div>
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-muted/60 px-3 py-2.5">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
            Переглянути
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function HomePage() {
  const { data: locations } = useLocations();
  const { data: oficiant } = useOficiant();
  const { data: zhanry } = useZhanry();

  const locationCategories = locations ? new Set(locations.map((l) => l.category)).size : undefined;
  const oficiantCategories = oficiant ? new Set(oficiant.map((o) => o.category)).size : undefined;
  const zhanryCategories = zhanry ? new Set(zhanry.map((z) => z.category)).size : undefined;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Від творців "Шо з єбалом" і "Бичого цепня"
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          База матеріалів для імпровізаційного театру. Оберіть категорію щоб розпочати.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CategoryCard
          to="/lokatsii"
          icon={<MapPin className="h-6 w-6 text-primary" />}
          accentClass="bg-primary/10"
          title="Локації"
          description="Місця де відбувається дія сцени — від реальних побутових просторів до фантастичних світів."
          count={locations?.length}
          countLabel="локацій"
          stats={[{ label: "категорій", value: locationCategories?.toString() ?? "—" }]}
        />

        <CategoryCard
          to="/oficiant"
          icon={<Package className="h-6 w-6 text-accent" />}
          accentClass="bg-accent/10"
          title="Офіцінат"
          description="Предмети — від звичних до абсурдних — що стають центром або деталлю сцени."
          count={oficiant?.length}
          countLabel="предметів"
          stats={[{ label: "категорій", value: oficiantCategories?.toString() ?? "—" }]}
        />

        <CategoryCard
          to="/zhanry"
          icon={<Clapperboard className="h-6 w-6 text-primary" />}
          accentClass="bg-primary/10"
          title="Жанри"
          description="Жанри та стилі сцен — задають тональність, темп і очікування від гри."
          count={zhanry?.length}
          countLabel="жанрів"
          stats={[{ label: "категорій", value: zhanryCategories?.toString() ?? "—" }]}
        />
      </div>
    </div>
  );
}
