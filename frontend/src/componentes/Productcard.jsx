import React from "react";

function Productcard({ nombre, precio, stock, id }) {
  return (
    <div class="border border-gray-700 rounded-lg shadow-sm bg-gray-800">
      <a href={`/producto?${id}`}>
        <img
          src={`../frontend/public/${id}.jpg`}
          alt="imagen"
          className="p-8 rounded-t-lg"
        />
      </a>
      <div class="px-5 pb-5">
        <a href={`/producto?${id}`}>
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {nombre}
          </h5>
        </a>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">
            ${precio}
          </span>
          <a
            href={`/producto?${id}`}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unidades en stock: {stock}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
