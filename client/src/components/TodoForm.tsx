import { useState, type FormEvent } from "react";
import type { TodoPayload } from "../interfaces/todo";

interface TodoFormProps {
  initialValues?: TodoPayload;
  submitLabel?: string;
  onSubmit: (payload: TodoPayload) => Promise<void>;
  onCancel?: () => void;
}

function TodoForm({
  initialValues,
  submitLabel = "Add TODO",
  onSubmit,
  onCancel,
}: TodoFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2 rounded bg-gray-500/90 focus:outline-none"
        />
      </div>

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
          className="w-full px-3 py-2 rounded bg-gray-500/90 focus:outline-none"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-white px-4 py-2 text-gray-700 cursor-pointer transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-orange px-4 py-2 font-medium text-white hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
