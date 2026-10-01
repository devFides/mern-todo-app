import axios from "axios";
import type { Todo, TodoPayload } from "../interfaces/todo";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await api.get<Todo[]>("/todos");
    return data;
  },

  create: async (input: TodoPayload): Promise<Todo> => {
    const { data } = await api.post<Todo>("/todos", input);
    return data;
  },

  update: async (id: string, input: TodoPayload): Promise<Todo> => {
    const { data } = await api.put<Todo>(`/todos/${id}`, input);
    return data;
  },

  toggleDone: async (id: string): Promise<Todo> => {
    const { data } = await api.patch<Todo>(`/todos/${id}/done`);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
