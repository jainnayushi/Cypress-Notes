// Using the api https://dummyjson.com/todos write react code to display existing todos and to edit or delete each of them and to add a new todo use antd components for the same.
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Input, List } from "antd";
import axios from "axios";
import "antd";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios.get("https://dummyjson.com/todos").then((response) => {
      setTodos(response.data.todos);
    });
  }, []);

  const handleEdit = (index) => {
    const todo = todos[index];
    const updatedTodo = prompt("Edit todo:", todo.todo);

    if (updatedTodo) {
      const newTodos = [...todos];
      newTodos[index] = { ...todo, todo: updatedTodo };
      setTodos(newTodos);
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (newTodo) {
      const newTodos = [{ todo: newTodo, completed: false }, ...todos];
      setTodos(newTodos);
      setNewTodo("");
    }
  };

  return (
    <div>
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onPressEnter={handleAdd}
      />
      <Button onClick={handleAdd}>Add</Button>
      <List
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button onClick={() => handleEdit(index)}>Edit</Button>,
              <Button onClick={() => handleDelete(index)}>Delete</Button>,
            ]}
          >
            <span>{todo.todo}</span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Todo;
