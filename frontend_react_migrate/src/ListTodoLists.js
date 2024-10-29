import { useEffect, useState } from "react";
import "./ListTodoLists.css";

function ListTodoLists() {
  const [listSummaries, setListSummaries] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch("http://localhost:8000/api/v1/lists"); // Adjust the URL as needed
      const data = await response.json();
      setListSummaries(data);
    };

    fetchLists();
  }, []);

  return (
    <div className="ListTodoLists">
      {listSummaries.map((list) => (
        <div key={list.id}>
          <h2>{list.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default ListTodoLists;
