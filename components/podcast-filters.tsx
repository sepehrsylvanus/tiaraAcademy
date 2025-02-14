import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "@/utils/types";
import { Search } from "lucide-react";

interface PodcastFiltersProps {
  filters: Filter;
  onFilterChange: (key: keyof Filter, value: string) => void;
}

export function PodcastFilters({
  filters,
  onFilterChange,
}: PodcastFiltersProps) {
  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Search podcasts..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <Select
          value={filters.duration}
          onValueChange={(value) => onFilterChange("duration", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Duration</SelectItem>
            <SelectItem value="0-15">0-15 minutes</SelectItem>
            <SelectItem value="15-30">15-30 minutes</SelectItem>
            <SelectItem value="30+">30+ minutes</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value) => onFilterChange("category", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Conversation">Conversation</SelectItem>
            <SelectItem value="Grammar">Grammar</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="IELTS">IELTS</SelectItem>
            <SelectItem value="Literature">Literature</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
            <SelectItem value="Kids">Kids</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
