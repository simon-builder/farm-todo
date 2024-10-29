import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./ToDoList";
import ListTodoLists from "./ListTodoLists";

function App() {
  const [listSummaries, setListSummaries] = useState(null);

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  async function reloadData() {
    const response = await axios.get("/api/v1/lists");
    const data = await response.data;
    setListSummaries(data);
  }

  return (
    <div className="App">
      <ListTodoLists />
    </div>
  );
}

export default App;
