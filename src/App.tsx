import Table from "./components/Table";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

type ToDoItem = {
  userId: number;
  id: number;
  title: string;
};

export type ToDoList = ToDoItem[];

function App() {
  const [data, setData] = useState<ToDoList>([]);
  const [sortByValue, setSortByValue] = useState<"userId" | "title">("userId");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const sortHandler = (value: "userId" | "title") => {
    setSortByValue(value);
  };

  const sortData = (value: "userId" | "title", data: ToDoList) => {
    console.log("sort function called!");
    const sortedData = [...data].sort((a, b) => {
      if (value === "userId") {
        return a.userId - b.userId;
      } else if (value === "title") {
        return a.title > b.title ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const sortedData = useMemo(
    () => sortData(sortByValue, data),
    [sortByValue, data]
  );

  return (
    <div>
      <h1 className="text-center">To Do List</h1>
      <div className="button-wrapper">
        <button onClick={() => sortHandler("userId")}>Sort By User ID</button>
        <button onClick={() => sortHandler("title")}>Sort By Title</button>
      </div>

      <Table headers={["User ID", "ID", "Title"]} data={sortedData} />
    </div>
  );
}

export default App;
