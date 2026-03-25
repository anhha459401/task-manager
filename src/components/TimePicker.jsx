import { useState, useRef, useEffect } from "react";

export default function TimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

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

  const handleSelect = (h, m) => {
    onChange(`${h}:${m}`);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder="HH:mm"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          let val = e.target.value;

          // ✅ Chỉ cho nhập số và dấu :
          val = val.replace(/[^0-9:]/g, "");

          // ✅ Auto thêm dấu :
          if (val.length === 2 && !val.includes(":")) {
            val = val + ":";
          }

          onChange(val);
        }}
        className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[9999] bg-white border border-gray-300 rounded-2xl shadow-lg p-4 w-[200px] max-w-[90vw]">
          {/* Quick select */}
          <div className="flex flex-wrap gap-2 mb-3">
            {["08:00", "12:00", "18:00", "22:00"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange(t)}
                className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-indigo-100"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Danh sách giờ */}
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {hours.map((h) =>
              minutes.map((m) => {
                const time = `${h}:${m}`;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleSelect(h, m)}
                    className={`px-2 py-1 rounded text-sm ${
                      value === time
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-indigo-100"
                    }`}
                  >
                    {time}
                  </button>
                );
              }),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
