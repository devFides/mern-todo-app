import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}
