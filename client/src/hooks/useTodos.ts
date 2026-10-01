import { useEffect, useState } from "react";
import * as todoService from "../services/todoService";
import type { Todo, TodoPayload } from "../interfaces/todo";
import { getErrorMessage } from "../utils/getErrorMessage";

export interface Notice {
  type: "success" | "error";
  message: string;
  persistent?: boolean; // true only for the initial load failure
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<Notice | null>(null);

  const fetchTodos = () => todoService.todoApi.getAll();

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        setTodos(data);
        setNotice(null);
      })
      .catch((err) => {
        setNotice({
          type: "error",
          message: getErrorMessage(err, "Could not load your TODOs."),
          persistent: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loadTodos = () => {
    setIsLoading(true);
    setNotice(null);
    fetchTodos()
      .then((data) => {
        setTodos(data);
        setNotice(null);
      })
      .catch((err) => {
        setNotice({
          type: "error",
          message: getErrorMessage(err, "Could not load your TODOs."),
          persistent: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addTodo = async (payload: TodoPayload): Promise<boolean> => {
    try {
      const created = await todoService.todoApi.create(payload);
      setTodos((prev) => [created, ...prev]);
      setNotice({ type: "success", message: "TODO added" });
      return true;
    } catch (err) {
      setNotice({
        type: "error",
        message: getErrorMessage(err, "Could not add the TODO."),
        persistent: true,
      });
      return false;
    }
  };

  const editTodo = async (
    id: string,
    payload: TodoPayload,
  ): Promise<boolean> => {
    try {
      const updated = await todoService.todoApi.update(id, payload);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setNotice({ type: "success", message: "TODO updated" });
      return true;
    } catch (err) {
      setNotice({
        type: "error",
        message: getErrorMessage(err, "Could not save your changes."),
      });
      return false;
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updated = await todoService.todoApi.toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setNotice({
        type: "success",
        message: updated.done ? "Marked completed" : "Marked uncompleted",
      });
    } catch (err) {
      setNotice({
        type: "error",
        message: getErrorMessage(err, "Could not update the TODO."),
      });
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await todoService.todoApi.remove(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
      setNotice({ type: "success", message: "TODO deleted" });
    } catch (err) {
      setNotice({
        type: "error",
        message: getErrorMessage(err, "Could not delete the TODO."),
      });
    }
  };

  return {
    todos,
    isLoading,
    notice,
    setNotice,
    loadTodos,
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
  };
}
