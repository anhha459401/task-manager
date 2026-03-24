import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function TaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || "");
  const [status, setStatus] = useState(task?.status || "TODO");
  const [deadline, setDeadline] = useState(
    task?.deadline ? task.deadline.slice(0, 16) : "", // format cho datetime-local
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      status,
      deadline: deadline ? new Date(deadline).toISOString() : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between border-b px-8 py-5">
          <h2 className="text-2xl font-semibold">
            {task ? "Sửa công việc" : "Thêm công việc mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên công việc
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              placeholder="Nhập tên công việc..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
            >
              <option value="TODO">Chưa làm (TODO)</option>
              <option value="IN_PROGRESS">Đang làm (In Progress)</option>
              <option value="DONE">Hoàn thành (Done)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline (thời hạn)
            </label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">Không bắt buộc</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold transition-all active:scale-95"
            >
              {task ? "Cập nhật" : "Thêm công việc"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
