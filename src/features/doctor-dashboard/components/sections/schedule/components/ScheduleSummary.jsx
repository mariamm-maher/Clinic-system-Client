import { useScheduleStore } from "../store/scheduleStore";

export default function ScheduleSummary({ className = "" }) {
  const { getScheduleStats } = useScheduleStore();
  const stats = getScheduleStats();

  const summaryItems = [
    {
      label: "Total",
      value: stats.totalSlots,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Available",
      value: stats.availableSlots,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Unavailable",
      value: stats.unavailableSlots,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Days",
      value: stats.activeDays,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div
      className={`flex items-center gap-4 px-4 py-2 rounded-lg border border-blue-100 bg-white/90 shadow-sm ${className}`}
      style={{ minWidth: 0 }}
    >
      {summaryItems.map((item) => (
        <div
          key={item.label}
          className={`flex flex-col items-center px-3 min-w-[60px] ${item.bgColor} rounded-lg`}
          style={{ fontSize: 15, lineHeight: 1.2 }}
        >
          <span className={`font-bold text-lg ${item.color}`}>
            {item.value}
          </span>
          <span className="text-xs text-gray-600 font-medium tracking-tight whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
