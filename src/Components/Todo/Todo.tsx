import { useState } from "react";

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<TodoItem[]>([]);
  const [editing, setEditing] = useState<{ id: number; todo: string } | null>(
    null
  );

  const addTodo = (newItem: string) => {
    if (!newItem.trim()) return;
    const newTodo: TodoItem = {
      id: Math.random(),
      todo: newItem,
      completed: false,
    };
    setList([...list, newTodo]);
    setInput("");
  };

  const deleteTodo = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };

  const toggleComplete = (id: number) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const startEditing = (item: TodoItem) => {
    setEditing({ id: item.id, todo: item.todo });
  };

  const editTodo = (newItem: string) => {
    if (editing) {
      setList(
        list.map((item) =>
          item.id === editing.id ? { ...item, todo: newItem } : item
        )
      );
      setEditing(null);
    }
  };

  return (
    <div className="myContainer">
      <h1>Your Todo List!</h1>
      <div className="row">
        <input
          type="text"
          value={editing ? editing.todo : input}
          onChange={(e) => {
            if (editing) {
              setEditing({ ...editing, todo: e.target.value });
            } else {
              setInput(e.target.value);
            }
          }}
        />
        <button
          className="addButton"
          onClick={() => {
            if (editing) {
              editTodo(editing.todo);
            } else {
              addTodo(input);
            }
          }}
        >
          {editing ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {list.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            {item.todo}
            <div className="button-group">
              <button
                className="complete"
                onClick={() => toggleComplete(item.id)}
              >
                {item.completed ? "Undo" : "Complete"}
              </button>
              <button className="edit" onClick={() => startEditing(item)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
