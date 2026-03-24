export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  timeFilter,
  setTimeFilter,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-5 mb-8 space-y-4">
      {/* Ô tìm kiếm */}
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 text-base placeholder-gray-400"
        />
      </div>

      {/* Hai select lọc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 text-base appearance-none"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="TODO">Chưa làm</option>
            <option value="IN_PROGRESS">Đang làm</option>
            <option value="DONE">Hoàn thành</option>
          </select>
        </div>

        <div>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 text-base appearance-none"
          >
            <option value="ALL">Tất cả thời gian</option>
            <option value="TODAY">Hôm nay</option>
            <option value="WEEK">Tuần này</option>
            <option value="MONTH">Tháng này</option>
            <option value="YEAR">Năm nay</option>
          </select>
        </div>
      </div>
    </div>
  );
}
