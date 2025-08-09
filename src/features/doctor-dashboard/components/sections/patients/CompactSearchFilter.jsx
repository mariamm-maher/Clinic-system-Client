import {
  Search,
  Filter,
  X,
  Heart,
  AlertTriangle,
  Activity,
} from "lucide-react";
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
  statuses = ["critical", "monitoring", "stable"],
}) {
  const hasActiveFilters = searchTerm || statusFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "monitoring":
        return <Activity className="h-4 w-4 text-yellow-500" />;
      case "stable":
        return <Heart className="h-4 w-4 text-green-500" />;
      default:
        return <Heart className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-50 via-pink-50 to-rose-50 border-b border-slate-200 p-4 *:rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search and Filter Row */}
        <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
          {/* Compact Search */}
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 h-9 text-sm border-slate-200 bg-white/80 focus:bg-white focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-all"
            />
          </div>

          {/* Compact Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 h-9 text-sm border-slate-200 bg-white/80 focus:bg-white focus:ring-1 focus:ring-red-400 focus:border-red-400">
              <div className="flex items-center gap-1">
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-slate-200 shadow-lg">
              <SelectItem value="all" className="text-sm">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-slate-400" />
                  All Patients
                </div>
              </SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status} className="text-sm">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
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
            className="bg-red-100 text-red-700 border-red-200 text-xs px-2 py-1"
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

          {statusFilter !== "all" && (
            <Badge
              variant="outline"
              className="border-purple-300 bg-purple-50 text-purple-700 text-xs px-2 py-1"
            >
              {statusFilter}
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
