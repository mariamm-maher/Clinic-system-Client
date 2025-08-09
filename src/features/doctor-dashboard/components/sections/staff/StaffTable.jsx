import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Clock, Phone, Mail, Shield, Users } from "lucide-react";
import CompactSearchFilter from "./CompactSearchFilter";

export default function StaffTable({
  staff,
  onViewStaff,
  onEditStaff,
  searchTerm,
  setSearchTerm,
  shiftFilter,
  setShiftFilter,
  totalStaffCount,
}) {
  const getShiftIcon = (shift) => {
    return shift === "morning" ? "🌅" : "🌙";
  };

  const getShiftColor = (shift) => {
    return shift === "morning"
      ? "bg-orange-100 text-orange-700 border-orange-200"
      : "bg-indigo-100 text-indigo-700 border-indigo-200";
  };
  return (
    <div className="overflow-x-auto">
      {/* Compact Search Filter Header */}
      <CompactSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        shiftFilter={shiftFilter}
        setShiftFilter={setShiftFilter}
        filteredCount={staff.length}
        totalCount={totalStaffCount}
        shifts={["morning", "night"]}
      />

      <Table>
        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="font-semibold text-slate-700 py-4">
              Staff Member
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Contact
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Security
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Schedule
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Phone
            </TableHead>
            <TableHead className="text-right font-semibold text-slate-700"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((member) => (
            <TableRow
              key={member.id}
              className="border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 cursor-pointer transition-all duration-200 group"
              onClick={() => onViewStaff(member.id)}
            >
              <TableCell className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {member.name}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      ID: {member.id} • {member.role}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {member.email}
                  </div>
                  <div className="text-xs text-slate-500">
                    {member.department}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Shield className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="font-mono text-sm text-slate-400 select-none tracking-wider">
                    ••••••••••
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  className={`${getShiftColor(
                    member.shift
                  )} font-medium px-3 py-1 flex items-center gap-2 w-fit`}
                  variant="outline"
                >
                  <span>{getShiftIcon(member.shift)}</span>
                  {member.shift.charAt(0).toUpperCase() + member.shift.slice(1)}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Phone className="h-4 w-4 text-slate-400" />
                  {member.phone}
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewStaff(member.id);
                    }}
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditStaff(member.id);
                    }}
                    className="h-8 w-8 p-0 hover:bg-indigo-100 hover:text-indigo-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {staff.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">
            No staff members found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search criteria or add a new staff member.
          </p>
        </div>
      )}
    </div>
  );
}
