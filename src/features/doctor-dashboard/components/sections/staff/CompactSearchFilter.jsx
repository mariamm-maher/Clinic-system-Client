import { Search, Filter, X, Activity, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CompactSearchFilter({
  searchTerm,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterLabel = "Filter",
  totalCount,
  filteredCount,
}) {
  const hasActiveFilters = searchTerm || filterValue !== "all";

  const clearFilters = () => {
    onSearchChange("");
    onFilterChange("all");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-slate-200 p-4 *:rounded-lg shadow-sm ">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search and Filter Row */}
        <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
          {/* Compact Search */}
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search staff..."
              className="pl-10 bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Compact Filter */}
          <Select value={filterValue} onValueChange={onFilterChange}>
            <SelectTrigger className="w-48 bg-white/80 border-slate-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <SelectValue placeholder={`Filter by ${filterLabel}`} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary and Clear */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Results Count */}
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-1"
          >
            {filteredCount} of {totalCount}
          </Badge>

          {/* Active Filter Badges */}
          {searchTerm && (
            <Badge
              variant="outline"
              className="border-emerald-300 bg-emerald-50 text-emerald-700 text-xs px-2 py-1"
            >
              "{searchTerm}"
            </Badge>
          )}

       

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-7 px-2 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
