import { useState, type FormEvent } from "react";
import type { TodoPayload } from "../interfaces/todo";
import {
  DESCRIPTION_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  validateTodoInput,
} from "../utils/validation";

import Notification from "./Notification";

interface TodoFormProps {
  initialValues?: TodoPayload;
  submitLabel?: string;
  onSubmit: (payload: TodoPayload) => Promise<boolean>;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const errors = validateTodoInput(title, description);
  const isFormValid = Object.keys(errors).length === 0;
  const titleOverLimit = title.trim().length > TITLE_MAX_LENGTH;
  const descriptionOverLimit =
    description.trim().length > DESCRIPTION_MAX_LENGTH;
  const titleMessage = titleOverLimit || touched ? errors.title : undefined;
  const descriptionMessage = descriptionOverLimit
    ? errors.description
    : undefined;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (!isFormValid) return;

    setIsSubmitting(true);
    const success = await onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
    setIsSubmitting(false);

    if (success && !initialValues) {
      setTitle("");
      setDescription("");
      setTouched(false);
    }
  };

  const handleCancel = () => {
    setTitle(initialValues?.title ?? "");
    setDescription(initialValues?.description ?? "");
    setTouched(false);
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (Required)"
          className="w-full px-3 py-2 rounded bg-gray-500/90 focus:outline-none"
        />
        <div className="mt-1 flex justify-end text-xs">
          <span
            className={
              title.length > TITLE_MAX_LENGTH ? "text-red-600" : "text-gray-100"
            }
          >
            {title.length}/{TITLE_MAX_LENGTH}
          </span>
        </div>
        {titleMessage && (
          <Notification type="error" message={titleMessage} autoDismissMs={0} />
        )}
      </div>

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
          className="w-full px-3 py-2 rounded bg-gray-500/90 focus:outline-none"
        />
        <div className="mt-1 flex justify-end text-xs">
          <span
            className={
              description.length > DESCRIPTION_MAX_LENGTH
                ? "text-red-600"
                : "text-gray-100"
            }
          >
            {description.length}/{DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
        {descriptionMessage && (
          <Notification
            type="error"
            message={descriptionMessage}
            autoDismissMs={0}
          />
        )}
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="rounded bg-white px-4 py-2 text-gray-700 cursor-pointer transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="rounded bg-orange px-4 py-2 font-medium text-white hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
