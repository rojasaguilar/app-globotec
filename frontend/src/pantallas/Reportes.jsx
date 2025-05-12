import React, { useState } from "react";

export default function Reportes() {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  console.log(dates);
  return (
    <div className="flex flex-col p-4 space-y-3">
        {/* DATES PICKER */}
      <div className="flex flex-row bg-blue-100 w-1/2 self-center justify-between">
        <div>
          <p>{`Start date: ${dates.startDate}`}</p>
          <input type="date" name="start" onChange={(e) => setDates({ ...dates, startDate: e.target.value })} />
        </div>

        <div className="self-end">
          <p>{`End date: ${dates.endDate}`}</p>
          <input type="date" name="end" onChange={(e) => setDates({ ...dates, endDate: e.target.value })} />
        </div>
      </div>
      <div className="w-full h-[500px] bg-red-100">
        reporte
      </div>
    </div>
  );
}
