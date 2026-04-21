import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Location } from "@/types/location";
import { cn } from "@/lib/utils";

const energyColors: Record<string, string> = {
  висока: "bg-orange-100 text-orange-800 border-orange-200",
  низька: "bg-blue-100 text-blue-800 border-blue-200",
  середня: "bg-yellow-100 text-yellow-800 border-yellow-200",
  напружена: "bg-red-100 text-red-800 border-red-200",
  хаотична: "bg-purple-100 text-purple-800 border-purple-200",
  розслаблена: "bg-green-100 text-green-800 border-green-200",
  містична: "bg-indigo-100 text-indigo-800 border-indigo-200",
  таємнича: "bg-indigo-100 text-indigo-800 border-indigo-200",
  прихована: "bg-slate-100 text-slate-800 border-slate-200",
  технічна: "bg-cyan-100 text-cyan-800 border-cyan-200",
  тепла: "bg-amber-100 text-amber-800 border-amber-200",
  офіційна: "bg-gray-100 text-gray-800 border-gray-200",
  формальна: "bg-gray-100 text-gray-800 border-gray-200",
  елегантна: "bg-rose-100 text-rose-800 border-rose-200",
  вишукана: "bg-rose-100 text-rose-800 border-rose-200",
};

function getEnergyColor(energy: string): string {
  return energyColors[energy] ?? "bg-secondary text-secondary-foreground border-border";
}

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="group h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground"># {location.id}</span>
          <Badge variant="outline" className="text-xs">
            {location.category}
          </Badge>
        </div>

        <h3 className="mb-3 text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {location.name}
        </h3>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Енергія:</span>
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
              getEnergyColor(location.energy),
            )}
          >
            {location.energy}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
