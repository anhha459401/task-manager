import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Filter } from "lucide-react";
import Login from "./components/Login";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import SearchFilter from "./components/SearchFilter";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";
import ConfirmModal from "./components/ConfirmModal";
import { useTasks } from "./hooks/useTasks";
import CustomSelect from "./components/CustomSelect";
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
  const [activeTab, setActiveTab] = useState("TODO");

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { tasks, addTask, updateTask, deleteTask } = useTasks(currentUser);

  useEffect(() => {
    const handleClick = () => setShowMobileFilter(false);
    if (showMobileFilter) {
      document.addEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [showMobileFilter]);

  const toggleSelectTask = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = () => {
    if (selectedTasks.length === 0) return;
    setShowConfirm(true);
  };

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
    if (selectedTasks.length > 0) {
      selectedTasks.forEach((id) => deleteTask(id));
      toast.success(`Đã xóa ${selectedTasks.length} công việc!`);
      setSelectedTasks([]);
    } else if (taskToDelete) {
      deleteTask(taskToDelete);
      toast.success("Đã xóa công việc thành công!");
    }

    setTaskToDelete(null);
    setShowConfirm(false);
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

        {/* ==================== MOBILE SEARCH + FILTER ==================== */}
        <div className="lg:hidden mb-6 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileFilter(!showMobileFilter);
              }}
              className="px-4 py-3 border border-gray-300 rounded-2xl bg-white shadow-sm cursor-pointer"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {showMobileFilter && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow p-4 space-y-4 animate-fade-in"
            >
              {/* Status */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Trạng thái
                </label>
                <CustomSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "ALL", label: "Tất cả trạng thái" },
                    { value: "TODO", label: "Chưa làm" },
                    { value: "IN_PROGRESS", label: "Đang làm" },
                    { value: "DONE", label: "Hoàn thành" },
                  ]}
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Thời gian
                </label>
                <CustomSelect
                  value={timeFilter}
                  onChange={setTimeFilter}
                  options={[
                    { value: "ALL", label: "Tất cả thời gian" },
                    { value: "TODAY", label: "Hôm nay" },
                    { value: "WEEK", label: "Tuần này" },
                    { value: "MONTH", label: "Tháng này" },
                    { value: "YEAR", label: "Năm nay" },
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        {/* ==================== DESKTOP FILTER ==================== */}
        <div className="hidden lg:block">
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
        </div>

        {/* BULK ACTION */}
        {selectedTasks.length > 0 && (
          <div className="mb-6 bg-white rounded-2xl shadow p-4 flex justify-between">
            <span>Đã chọn {selectedTasks.length}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTasks([])}
                className="px-4 py-2 text-sm bg-gray-100 cursor-pointer rounded-xl hover:bg-gray-200"
              >
                Bỏ chọn
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 text-sm bg-red-600 cursor-pointer text-white rounded-xl hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        )}

        {/* MOBILE TABS */}
        <div className="lg:hidden flex bg-white rounded-2xl p-1 mb-6 shadow-sm">
          {columnData.map((col) => (
            <button
              key={col.status}
              onClick={() => setActiveTab(col.status)}
              className={`flex-1 py-3 text-sm rounded-xl ${
                activeTab === col.status
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                selectedTasks={selectedTasks}
                onSelect={toggleSelectTask}
              />
            </div>
          ))}
        </div>
      </div>

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
