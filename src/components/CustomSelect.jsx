import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Chọn...",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const selected = options.find((opt) => opt.value === value);

  // Đóng khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={ref}>
      {/* Select box */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-center cursor-pointer hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 transition-all"
      >
        <span className="text-gray-700">
          {selected ? selected.label : placeholder}
        </span>

        <span
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-5 py-3 cursor-pointer transition ${
                value === opt.value
                  ? "bg-indigo-100 text-indigo-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
