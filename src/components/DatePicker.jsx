import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

export default function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const ref = useRef();

  // đóng khi click ngoài
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // validate YYYY-MM-DD
  const isValidDate = (date) => {
    if (!date) return true;
    return dayjs(date, "YYYY-MM-DD", true).isValid();
  };

  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();

  const days = Array.from({ length: daysInMonth }, (_, i) =>
    startOfMonth.add(i, "day"),
  );

  return (
    <div className="relative" ref={ref}>
      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder="YYYY-MM-DD"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          let val = e.target.value;

          // chỉ cho số + -
          val = val.replace(/[^0-9-]/g, "");

          // auto format YYYY-MM-DD
          if (val.length === 4 || val.length === 7) {
            if (!val.endsWith("-")) val += "-";
          }

          onChange(val);
        }}
        className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />

      {/* Calendar */}
      {open && (
        <div className="absolute bottom-full mb-2 z-[9999] bg-white border rounded-2xl shadow-lg p-4 w-72">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            >
              ◀
            </button>

            <span className="font-medium">
              {currentMonth.format("MM/YYYY")}
            </span>

            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            >
              ▶
            </button>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((d) => {
              const dateStr = d.format("YYYY-MM-DD");

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => {
                    onChange(dateStr);
                    setOpen(false);
                  }}
                  className={`cursor-pointer py-2 rounded-lg text-sm ${
                    value === dateStr
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100"
                  }`}
                >
                  {d.date()}
                </button>
              );
            })}
          </div>

          {/* Quick select */}
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => onChange(dayjs().format("YYYY-MM-DD"))}
              className="text-xs px-2 py-1 bg-gray-100 rounded cursor-pointer"
            >
              Hôm nay
            </button>

            <button
              type="button"
              onClick={() =>
                onChange(dayjs().add(1, "day").format("YYYY-MM-DD"))
              }
              className="text-xs px-2 py-1 bg-gray-100 rounded cursor-pointer"
            >
              Ngày mai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
