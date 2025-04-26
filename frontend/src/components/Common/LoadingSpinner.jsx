import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = "medium" }) {
  const sizeClass =
    {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8",
    }[size] || "w-6 h-6";

  return (
    <div className="flex justify-center items-center py-4">
      <Loader2 className={`${sizeClass} animate-spin text-blue-600`} />
    </div>
  );
}
