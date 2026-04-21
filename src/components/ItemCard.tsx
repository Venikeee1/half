import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const moodColors: Record<string, string> = {
  весела: "bg-yellow-100 text-yellow-800 border-yellow-200",
  легка: "bg-green-100 text-green-800 border-green-200",
  важка: "bg-slate-100 text-slate-800 border-slate-200",
  похмура: "bg-gray-100 text-gray-800 border-gray-200",
  напружена: "bg-red-100 text-red-800 border-red-200",
  емоційна: "bg-pink-100 text-pink-800 border-pink-200",
  аналітична: "bg-blue-100 text-blue-800 border-blue-200",
  динамічна: "bg-orange-100 text-orange-800 border-orange-200",
  епічна: "bg-purple-100 text-purple-800 border-purple-200",
  моторошна: "bg-indigo-100 text-indigo-800 border-indigo-200",
  іронічна: "bg-amber-100 text-amber-800 border-amber-200",
  радісна: "bg-yellow-100 text-yellow-800 border-yellow-200",
  їдка: "bg-lime-100 text-lime-800 border-lime-200",
  дивна: "bg-violet-100 text-violet-800 border-violet-200",
  авторитарний: "bg-red-100 text-red-800 border-red-200",
  маніпулятивна: "bg-purple-100 text-purple-800 border-purple-200",
  зухвалий: "bg-orange-100 text-orange-800 border-orange-200",
  загадкова: "bg-indigo-100 text-indigo-800 border-indigo-200",
  лицемірний: "bg-slate-100 text-slate-800 border-slate-200",
  наполегливий: "bg-blue-100 text-blue-800 border-blue-200",
  прагматичний: "bg-gray-100 text-gray-800 border-gray-200",
  переконливий: "bg-amber-100 text-amber-800 border-amber-200",
  допитливий: "bg-cyan-100 text-cyan-800 border-cyan-200",
  таємничий: "bg-violet-100 text-violet-800 border-violet-200",
  ризикований: "bg-rose-100 text-rose-800 border-rose-200",
  щирий: "bg-green-100 text-green-800 border-green-200",
};

function getTagColor(tag: string): string {
  return moodColors[tag] ?? "bg-secondary text-secondary-foreground border-border";
}

interface ItemCardProps {
  id: number;
  name: string;
  category: string;
  tag: string;
  tagLabel: string;
}

export function ItemCard({ id, name, category, tag, tagLabel }: ItemCardProps) {
  return (
    <Card className="group h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground"># {id}</span>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>

        <h3 className="mb-3 text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">{tagLabel}:</span>
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
              getTagColor(tag),
            )}
          >
            {tag}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
