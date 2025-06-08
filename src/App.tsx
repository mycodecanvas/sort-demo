import Table from "./components/Table";
import { useMemo, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

type ToDoItem = {
  userId: number;
  id: number;
  title: string;
};

export type ToDoList = ToDoItem[];
const fetchToDos = async (): Promise<ToDoList> => {
  return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => {
      return json as ToDoList;
    });
};

function App() {
  const [sortByValue, setSortByValue] = useState<"userId" | "title">("userId");
  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchToDos,
  });

  const sortHandler = (value: "userId" | "title") => {
    setSortByValue(value);
  };

  const sortData = (value: "userId" | "title", data: ToDoList) => {
    const sortedData = [...data].sort((a, b) => {
      if (value === "userId") {
        return a.userId - b.userId;
      } else if (value === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    return sortedData;
  };

  const sortedData = useMemo(() => {
    if (!data) return [];
    return sortData(sortByValue, data);
  }, [sortByValue, data]);

  return (
    <div>
      <h1 className="text-center">To Do List</h1>
      <div className="button-wrapper">
        <button onClick={() => sortHandler("userId")}>Sort By User ID</button>
        <button onClick={() => sortHandler("title")}>Sort By Title</button>
      </div>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isPending && !error && data && (
        <Table headers={["User ID", "ID", "Title"]} data={sortedData} />
      )}
    </div>
  );
}

export default App;
