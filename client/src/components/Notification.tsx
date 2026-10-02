import { useEffect } from "react";

export type NotificationType = "success" | "error";

interface NotificationProps {
  type: NotificationType;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  autoDismissMs?: number;
}

function Notification({
  type,
  message,
  onRetry,
  onDismiss,
  autoDismissMs = 4000,
}: NotificationProps) {
  useEffect(() => {
    if (!autoDismissMs || !onDismiss) return;
    const timer = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(timer);
  }, [message, autoDismissMs, onDismiss]);

  const colors =
    type === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-800";

  const position =
    "fixed top-4 left-4 right-4 z-50 mx-auto max-w-sm sm:left-auto";

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`${position} flex animate-fade-in items-start justify-between gap-3 rounded-lg border p-3 text-sm shadow-md ${colors}`}
    >
      <p>{message}</p>
      {(onRetry || onDismiss) && (
        <div className="flex shrink-0 gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="font-medium underline hover:no-underline"
            >
              Try again
            </button>
          )}
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="font-medium hover:underline"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
