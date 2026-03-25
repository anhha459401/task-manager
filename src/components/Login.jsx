import { useState } from "react";
import { User } from "lucide-react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onLogin(username.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-500 mt-2">Quản lý công việc cá nhân</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 text-lg mb-6"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.98]"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
