import dayjs from "dayjs";

export const isOverdue = (deadline) => {
  if (!deadline) return false;
  return dayjs(deadline).isBefore(dayjs(), "minute");
};

export const isNearDeadline = (deadline) => {
  if (!deadline) return false;
  const diffHours = dayjs(deadline).diff(dayjs(), "hour");
  return diffHours >= 0 && diffHours <= 72; // Còn dưới 3 ngày
};

export const formatDeadline = (deadline) => {
  if (!deadline) return "Không có hạn";
  return dayjs(deadline).format("DD/MM/YYYY HH:mm");
};

export const getDeadlineColor = (deadline, status) => {
  if (status === "DONE") return "text-emerald-600";
  if (!deadline) return "text-gray-400";
  if (isOverdue(deadline)) return "text-red-600 font-medium";
  if (isNearDeadline(deadline)) return "text-amber-600 font-medium";
  return "text-gray-600";
};
