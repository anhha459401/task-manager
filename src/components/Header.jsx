import { useState, useEffect, useRef } from "react";
import { Plus, LogOut } from "lucide-react";

export default function Header({ user, onLogout, onAdd }) {
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef(null);

  //  Lấy chữ cái đầu (giữ nguyên logic bạn)
  const getAvatarLetter = (name) => {
    if (!name) return "?";
    const lastName = name.trim().split(" ").pop();
    return lastName.charAt(0).toUpperCase();
  };

  //  Load avatar theo user
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`avatar_${user}`);
    setAvatar(saved || null);
  }, [user]);

  //  Click avatar → mở chọn file
  const handleAvatarClick = () => {
    fileRef.current.click();
  };

  //  Xử lý upload ảnh
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // (optional) check size < 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh quá lớn! Vui lòng chọn ảnh < 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;

      // lưu theo user
      localStorage.setItem(`avatar_${user}`, base64);
      setAvatar(base64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Tên */}
          <div className="flex items-center gap-3">
            {/*  Avatar */}
            <div
              onClick={handleAvatarClick}
              className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden relative hover:opacity-90"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-2xl">
                  {getAvatarLetter(user)}
                </span>
              )}
            </div>

            {/* input hidden */}
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleChangeAvatar}
              className="hidden"
            />

            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Công Việc Của Tôi
              </h1>
              <p className="text-sm text-gray-500">Xin chào, {user || "Bạn"}</p>
            </div>
          </div>

          {/* Buttons */}
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
