import { useEffect, useState } from "react";
import * as todoService from "../services/todoService";
import type { Todo, TodoPayload } from "../interfaces/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = () => todoService.todoApi.getAll();

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.error(err, "Failed to load todos");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addTodo = async (payload: TodoPayload) => {
    try {
      const created = await todoService.todoApi.create(payload);
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      console.error(err, "Failed to create todo");
    }
  };

  const editTodo = async (id: string, payload: TodoPayload) => {
    try {
      const updated = await todoService.todoApi.update(id, payload);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err, "Failed to update todo");
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updated = await todoService.todoApi.toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err, "Failed to toggle todo");
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await todoService.todoApi.remove(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err, "Failed to delete todo");
    }
  };

  return {
    todos,
    isLoading,
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
  };
}
