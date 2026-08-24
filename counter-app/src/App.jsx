import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-[300px] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl border border-gray-200">
        <div className="text-6xl font-semibold tabular-nums">{count}</div>

        <div className="flex gap-3">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-12 h-12 rounded-lg border border-gray-300 text-2xl hover:bg-gray-50 active:scale-95 transition"
          >
            −
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-4 h-12 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 active:scale-95 transition"
          >
            reset
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-12 h-12 rounded-lg border border-gray-300 text-2xl hover:bg-gray-50 active:scale-95 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}