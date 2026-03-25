import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import Pagination from "./Pagination";

const TASKS_PER_PAGE = 3; // ← Bạn có thể đổi thành 8, 9, 10... tùy thích

export default function TaskColumn({
  title,
  color,
  tasks,
  onEdit,
  onDelete,
  selectedTasks,
  onSelect,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset về trang 1 mỗi khi danh sách tasks thay đổi (search, lọc, thêm/sửa/xóa)
  useEffect(() => {
    setCurrentPage(1);
  }, [tasks]);

  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  const currentTasks = tasks.slice(
    (currentPage - 1) * TASKS_PER_PAGE,
    currentPage * TASKS_PER_PAGE,
  );

  return (
    <div className={`rounded-3xl p-6 ${color} min-h-[620px] flex flex-col`}>
      {/* Header cột */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
        <span className="bg-white/70 px-4 py-1 rounded-full text-sm font-medium text-gray-700">
          {tasks.length} công việc
        </span>
      </div>

      {/* Danh sách task trên trang hiện tại */}
      <div className="space-y-4 flex-1">
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              selectedTasks={selectedTasks}
              onSelect={onSelect}
            />
          ))
        ) : (
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-2xl">
            Chưa có công việc nào trong cột này
          </div>
        )}
      </div>

      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
