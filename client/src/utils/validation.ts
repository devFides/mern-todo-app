//Should match with the backend character limits
export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

export interface TodoFormErrors {
  title?: string;
  description?: string;
}

export function validateTodoInput(
  title: string,
  description: string,
): TodoFormErrors {
  const errors: TodoFormErrors = {};
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    errors.title = "Title is required";
  } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
    errors.title = `Title maximum character limit is: ${TITLE_MAX_LENGTH}`;
  }

  if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description maximum character limit is: ${DESCRIPTION_MAX_LENGTH}`;
  }

  return errors;
}
