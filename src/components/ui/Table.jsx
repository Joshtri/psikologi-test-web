// components/ui/SimpleTable.jsx
import React from "react";

export default function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                  {col.render ? col.render(row, rowIndex) : row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
