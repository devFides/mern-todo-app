//no route error handler
const notFound = (req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

//express error handler
const errorHandler = (err, req, res, next) => {
  // Malformed JSON in the request body
  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ message: "Request body contains invalid JSON" });
  }

  // Mongoose schema validation failed
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: Object.values(err.errors)[0].message });
  }

  // Other unexpected errors
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
};

module.exports = { notFound, errorHandler };
