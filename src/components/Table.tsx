import { memo, useEffect, useState, type ReactNode } from "react";
import type { ToDoList } from "../App";

type TableProps = {
  headers: string[];
  data: ToDoList;
};

const Table = memo(function Table({ headers, data }: TableProps) {
  console.log("Table component rendered");
  const [mappedData, setMappedData] = useState<unknown[][]>([]);
  useEffect(() => {
    if (data.length > 0) {
      const mappedData = data.map((row) => Object.values(row));
      setMappedData(mappedData);
    }
  }, [data]);
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mappedData.map((row, index) => (
          <tr key={index}>
            {row.map(
              (cell, cellIndex) =>
                cellIndex < row.length - 1 && (
                  <td key={cellIndex}>{cell as ReactNode}</td>
                )
            )}
          </tr>
        ))}
        {mappedData.length === 0 && (
          <tr>
            <td colSpan={headers.length}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}, arePropsEqual);

function arePropsEqual(prevProps: TableProps, nextProps: TableProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default Table;
