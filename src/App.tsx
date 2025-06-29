import Table from "./components/Table";
import { useEffect, useState } from "react";
import "./App.css";

type ToDoItem = {
  userId: number;
  id: number;
  title: string;
};

export type ToDoList = ToDoItem[];

function App() {
  const [data, setData] = useState<ToDoList>([]);
  const [sortedData, setSortedData] = useState<ToDoList>([]);
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setSortedData(json);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, []);

  const sortHandler = (value: "userId" | "title") => {
    setSortedData(sortData(value, data));
  };

  const sortData = (value: "userId" | "title", data: ToDoList) => {
    console.log("sort function called!");
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

  return (
    <div>
      <h1 className="text-center">To Do List</h1>
      <div className="button-wrapper">
        <button onClick={() => sortHandler("userId")}>Sort By User ID</button>
        <button onClick={() => sortHandler("title")}>Sort By Title</button>
      </div>

      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isPending && data && !error && (
        <Table headers={["User ID", "ID", "Title"]} data={sortedData} />
      )}
    </div>
  );
}

export default App;
