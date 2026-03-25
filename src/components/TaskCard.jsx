import { Edit2, Trash2, Clock } from "lucide-react";
import {
  formatDeadline,
  getDeadlineColor,
  isOverdue,
} from "../utils/dateUtils";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  selectedTasks,
  onSelect,
}) {
  const overdue = isOverdue(task.deadline) && task.status !== "DONE";

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 
      hover:shadow-md transition-all group ${overdue ? "border-red-300" : ""}`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={selectedTasks?.includes(task.id)}
          onChange={() => onSelect(task.id)}
          className="mt-1 w-4 h-4 accent-indigo-600 cursor-pointer"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3
              className={`font-medium text-lg leading-tight pr-2 ${task.status === "DONE" ? "line-through text-gray-400" : ""}`}
            >
              {task.title}
            </h3>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                type="button"
                className="p-2 text-gray-400 cursor-pointer hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                type="button"
                className="p-2 text-gray-400 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {task.deadline && (
            <div
              className={`flex items-center gap-2 text-sm mt-4 ${getDeadlineColor(task.deadline, task.status)}`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatDeadline(task.deadline)}</span>
              {overdue && (
                <span className="text-red-600 text-xs font-medium ml-auto">
                  QUÁ HẠN
                </span>
              )}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full
          ${task.status === "TODO" ? "bg-amber-100 text-amber-700" : ""}
          ${task.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700" : ""}
          ${task.status === "DONE" ? "bg-emerald-100 text-emerald-700" : ""}
        `}
            >
              {task.status === "TODO" && "Chưa làm"}
              {task.status === "IN_PROGRESS" && "Đang làm"}
              {task.status === "DONE" && "Hoàn thành"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
