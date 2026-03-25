import { Plus, LogOut, User } from "lucide-react";

export default function Header({ user, onLogout, onAdd }) {
  // Lấy chữ cái đầu của tên cuối
  const getAvatarLetter = (name) => {
    if (!name) return "?";
    const lastName = name.trim().split(" ").pop();
    return lastName.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Tên */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {getAvatarLetter(user)}
              </span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Công Việc Của Tôi
              </h1>
              <p className="text-sm text-gray-500">Xin chào, {user || "Bạn"}</p>
            </div>
          </div>

          {/* Nút Thêm + Đăng xuất */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAdd}
              className="flex items-center gap-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-medium text-sm transition-all active:scale-95 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Thêm công việc</span>
              <span className="sm:hidden">Thêm</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-600 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
