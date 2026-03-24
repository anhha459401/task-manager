import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function StatsBar({ stats }) {
  const statItems = [
    {
      icon: Clock,
      color: "bg-blue-100 text-blue-600",
      value: stats.total,
      label: "Tổng công việc",
    },
    {
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-600",
      value: stats.done,
      label: "Đã hoàn thành",
    },
    {
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
      value: stats.overdue,
      label: "Quá hạn",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-3xl p-4 shadow-sm flex flex-col items-center text-center"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${item.color}`}
            >
              <Icon className="w-7 h-7" />
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">
              {item.value}
            </p>
            <p className="text-xs text-gray-500 font-medium leading-tight">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
