const mongoose = require("mongoose");

const TITLE_MAX_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 5;

const titleError = (title) => {
  if (typeof title !== "string" || !title.trim()) {
    return "Title is required";
  }
  if (title.trim().length > TITLE_MAX_LENGTH) {
    return `Title maximum character limit is: ${TITLE_MAX_LENGTH}`;
  }
  return null;
};

const descriptionError = (description) => {
  if (typeof description !== "string") {
    return "Description must be text";
  }
  if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
    return `Description maximum character limit is: ${DESCRIPTION_MAX_LENGTH}`;
  }
  return null;
};

// Checks the :id in the URL
const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid todo id" });
  }
  next();
};

// POST: title is required, description is optional
const validateCreateTodo = (req, res, next) => {
  const { title, description } = req.body || {};

  const error =
    titleError(title) ||
    (description !== undefined ? descriptionError(description) : null);

  if (error) {
    return res.status(400).json({ message: error });
  }
  next();
};

// PUT: title and/or description, but at least one of them
const validateUpdateTodo = (req, res, next) => {
  const { title, description } = req.body || {};

  if (title === undefined && description === undefined) {
    return res
      .status(400)
      .json({ message: "Provide a title and/or description to update" });
  }

  const error =
    (title !== undefined ? titleError(title) : null) ||
    (description !== undefined ? descriptionError(description) : null);

  if (error) {
    return res.status(400).json({ message: error });
  }
  next();
};

module.exports = { validateId, validateCreateTodo, validateUpdateTodo };
