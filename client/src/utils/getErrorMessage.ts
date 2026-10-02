import axios from "axios";

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return "The request timed out. Please try again.";
    }
    if (!error.response) {
      return "Cannot reach the server. Check your connection and make sure the API is running.";
    }
    if (error.response.status >= 500) {
      return "The server ran into a problem. Please try again later.";
    }

    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
    return error.message;
  }
  return fallback;
}
