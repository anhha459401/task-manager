import CustomSelect from "./CustomSelect";

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  timeFilter,
  setTimeFilter,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-5 mb-8 space-y-5">
      {/* Ô tìm kiếm */}
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base placeholder-gray-400 transition-all"
        />
      </div>

      {/* Custom Select */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status */}
        <CustomSelect
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Tất cả trạng thái"
          options={[
            { value: "ALL", label: "Tất cả trạng thái" },
            { value: "TODO", label: "Chưa làm" },
            { value: "IN_PROGRESS", label: "Đang làm" },
            { value: "DONE", label: "Hoàn thành" },
          ]}
        />

        {/* Time */}
        <CustomSelect
          value={timeFilter}
          onChange={setTimeFilter}
          placeholder="Tất cả thời gian"
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
  );
}
