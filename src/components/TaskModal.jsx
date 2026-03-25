import { useState } from "react";
import { X } from "lucide-react";
import CustomSelect from "./CustomSelect";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function TaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || "");
  const [status, setStatus] = useState(task?.status || "TODO");

  const [date, setDate] = useState(
    task?.deadline ? task.deadline.slice(0, 10) : "",
  );
  const [time, setTime] = useState(
    task?.deadline ? task.deadline.slice(11, 16) : "",
  );

  const [error, setError] = useState("");

  const isValidDate = (date) => {
    if (!date) return true;
    return dayjs(date, "YYYY-MM-DD", true).isValid();
  };

  const isValidTime = (time) => {
    if (!time) return true;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return;

    if (date && !isValidDate(date)) {
      setError("Ngày không hợp lệ (YYYY-MM-DD)");
      return;
    }

    if (time && !isValidTime(time)) {
      setError("Thời gian phải đúng định dạng HH:mm");
      return;
    }

    let deadline = null;
    if (date && time) {
      deadline = new Date(`${date}T${time}`).toISOString();
    }

    onSave({
      title: title.trim(),
      status,
      deadline,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-visible">
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tên công việc
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-center cursor-pointer hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>

          {/* Status */}
          <CustomSelect
            value={status}
            onChange={setStatus}
            options={[
              { value: "TODO", label: "Chưa làm" },
              { value: "IN_PROGRESS", label: "Đang làm" },
              { value: "DONE", label: "Hoàn thành" },
            ]}
          />

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium mb-3">Deadline</label>

            <div className="grid grid-cols-2 gap-4">
              <DatePicker value={date} onChange={setDate} />
              <TimePicker value={time} onChange={setTime} />
            </div>

            {/* ✅ Hiển thị lỗi */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-gray-300 cursor-pointer rounded-2xl font-medium hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl cursor-pointer"
            >
              {task ? "Cập nhật" : "Thêm công việc"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
