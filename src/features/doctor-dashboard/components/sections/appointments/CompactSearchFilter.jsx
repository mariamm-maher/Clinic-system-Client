import { Search, X } from "lucide-react";
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
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filteredCount,
  totalCount,
  statuses = ["scheduled", "checked-in", "completed", "cancelled"],
}) {
  const hasActiveFilters = searchTerm || statusFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-slate-200 p-4 *:rounded-lg shadow-sm ">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 h-9 text-sm border-slate-200 bg-white/80 focus:bg-white focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 h-9 text-sm border-slate-200 bg-white/80 focus:bg-white focus:ring-1 focus:ring-blue-400 focus:border-blue-400">
              <div className="flex items-center gap-1">
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-slate-200 shadow-lg">
              <SelectItem value="all" className="text-sm">
                All Statuses
              </SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status} className="text-sm">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-1"
          >
            {filteredCount} of {totalCount}
          </Badge>
          {searchTerm && (
            <Badge
              variant="outline"
              className="border-emerald-300 bg-emerald-50 text-emerald-700 text-xs px-2 py-1"
            >
              "{searchTerm}"
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge
              variant="outline"
              className="border-purple-300 bg-purple-50 text-purple-700 text-xs px-2 py-1"
            >
              {statusFilter}
            </Badge>
          )}
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
