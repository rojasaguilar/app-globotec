import React, { useState, useEffect } from "react";
import axios from "axios";
import { DollarSign } from "lucide-react";

function TotalVentasHoy() {
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    const date = { date: new Date().toJSON().slice(0, 10) };
    axios
      .post("http://localhost:8081/ventas/hoy", date)
      .then((res) => {
        console.log(res.data.total);
        setTotal(res.data.total);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="bg-white flex w-full p-4 rounded-xl items-center gap-2">
      <div className="p-[0.12rem] rounded-full border border-blue-200">
        <div className="p-4 bg-blue-200 rounded-full">
        <DollarSign size={32} strokeWidth={1} color="#0063eb" />
        </div>
      </div>

      <div>
        <p className="text-xl">{total === null ? "$0" : `$${total}`}</p>
        <p className="text-gray-500 text-sm">Total Ventas de Hoy</p>
      </div>
    </div>
  );
}

export default TotalVentasHoy;
