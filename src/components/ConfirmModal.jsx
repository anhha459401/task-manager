import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-9 h-9 text-red-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Xác nhận xóa?
          </h2>
          <p className="text-gray-600 mb-8">
            Hành động này không thể hoàn tác.
            <br />
            Công việc sẽ bị xóa vĩnh viễn.
          </p>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl cursor-pointer font-medium transition-all active:scale-95"
            >
              Xóa công việc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
