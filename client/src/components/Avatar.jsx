import React from "react";
import { getInitials, getAvatarColor } from "../utils/format";

export default function Avatar({ name, size = "md" }) {
  const dimensions = size === "lg" ? "h-14 w-14 text-lg" : "h-9 w-9 text-xs";
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold ${dimensions} ${getAvatarColor(
        name
      )}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
