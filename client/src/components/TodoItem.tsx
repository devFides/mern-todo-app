import { useState } from "react";
import type { Todo, TodoPayload } from "../interfaces/todo";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onUpdate: (id: string, payload: TodoPayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (payload: TodoPayload) => {
    await onUpdate(todo._id, payload);
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    onDelete(todo._id);
  };

  if (isEditing) {
    return (
      <li className="bg-gray-800 p-4 shadow-sm">
        <TodoForm
          initialValues={{ title: todo.title, description: todo.description }}
          submitLabel="Save"
          onSubmit={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 bg-gray-800 p-4 shadow-sm">
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.done}
        aria-label={`Mark "${todo.title}" as ${todo.done ? "not done" : "done"}`}
        onClick={() => onToggle(todo._id)}
        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          todo.done
            ? "border-orange bg-orange cursor-pointer"
            : "border-orange bg-white hover:border-orange cursor-pointer"
        }`}
      >
        {todo.done && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 cursor-pointer"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h3 className="break-words font-medium text-gray-100">{todo.title}</h3>
        {todo.description && (
          <p className="mt-1 break-words text-sm text-gray-500">
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`Edit "${todo.title}"`}
          title="Edit"
          className="py-1 cursor-pointer"
        >
          ✏️
        </button>
        <button
          type="button"
          onClick={handleConfirmDelete}
          aria-label={`Delete "${todo.title}"`}
          title="Delete"
          className="px-1 cursor-pointer"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
