import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CategoryFilter({ categories, value, onChange, disabled }: CategoryFilterProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Всі категорії" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Всі категорії</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
