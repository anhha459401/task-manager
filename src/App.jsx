import { useState } from "react";
import { toast } from "react-toastify";
import Login from "./components/Login";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import SearchFilter from "./components/SearchFilter";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";
import ConfirmModal from "./components/ConfirmModal";
import { useTasks } from "./hooks/useTasks";
import dayjs from "dayjs";

export default function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser") || "",
  );

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [timeFilter, setTimeFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("TODO"); // Tab cho mobile

  const { tasks, addTask, updateTask, deleteTask } = useTasks(currentUser);

  const filteredTasks = tasks
    .filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchStatus =
        statusFilter === "ALL" || task.status === statusFilter;
      let matchTime = true;

      if (timeFilter !== "ALL" && task.deadline) {
        const deadline = dayjs(task.deadline);
        const now = dayjs();
        if (timeFilter === "TODAY") matchTime = deadline.isSame(now, "day");
        if (timeFilter === "WEEK") matchTime = deadline.isSame(now, "week");
        if (timeFilter === "MONTH") matchTime = deadline.isSame(now, "month");
        if (timeFilter === "YEAR") matchTime = deadline.isSame(now, "year");
      }
      return matchSearch && matchStatus && matchTime;
    })
    .sort((a, b) => b.id - a.id);

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "DONE").length,
    overdue: tasks.filter(
      (t) =>
        t.deadline &&
        dayjs(t.deadline).isBefore(dayjs()) &&
        t.status !== "DONE",
    ).length,
  };

  const columnData = [
    { status: "TODO", title: "Chưa làm", color: "bg-amber-100" },
    { status: "IN_PROGRESS", title: "Đang làm", color: "bg-blue-100" },
    { status: "DONE", title: "Hoàn thành", color: "bg-emerald-100" },
  ];

  const currentColumn =
    columnData.find((col) => col.status === activeTab) || columnData[0];
  const columnTasks = filteredTasks.filter((t) => t.status === activeTab);

  const handleAdd = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      toast.success("Đã xóa công việc thành công!", { theme: "colored" });
      setTaskToDelete(null);
      setShowConfirm(false);
    }
  };

  const saveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      toast.success("Cập nhật thành công!");
    } else {
      addTask(taskData);
      toast.success("Thêm công việc mới thành công!");
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser("");
    setSearchTerm("");
    setStatusFilter("ALL");
    setTimeFilter("ALL");
    setActiveTab("TODO");
  };

  if (!currentUser) return <Login onLogin={setCurrentUser} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={logout} onAdd={handleAdd} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <StatsBar stats={stats} />

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
        />

        {/* ==================== MOBILE TABS ==================== */}
        <div className="lg:hidden flex bg-white rounded-2xl p-1 mb-6 shadow-sm">
          {columnData.map((col) => (
            <button
              key={col.status}
              onClick={() => setActiveTab(col.status)}
              className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${
                activeTab === col.status
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>

        {/* ==================== DESKTOP GRID - MOBILE SINGLE COLUMN ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hiển thị tất cả 3 cột trên Desktop, chỉ 1 cột trên Mobile */}
          {columnData.map((col) => (
            <div
              key={col.status}
              className={
                activeTab === col.status || window.innerWidth >= 1024
                  ? "block"
                  : "hidden lg:block"
              }
            >
              <TaskColumn
                title={col.title}
                color={col.color}
                tasks={filteredTasks.filter((t) => t.status === col.status)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={saveTask}
          onClose={() => setShowModal(false)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setTaskToDelete(null);
          }}
        />
      )}
    </div>
  );
}
