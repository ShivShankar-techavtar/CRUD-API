import React from "react";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import Button from "./Button";

export default function EmptyState({ onAdd, isFiltered = false }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-4 px-6 py-16 text-center animate-fadeIn">
      <div className="h-16 w-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
        <FiUsers size={28} aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          {isFiltered ? "No matching users" : "No users found"}
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          {isFiltered
            ? "Try a different search term or clear your filters."
            : "Add your first user to start building your directory."}
        </p>
      </div>
      {!isFiltered && (
        <Button icon={FiUserPlus} onClick={onAdd}>
          Add User
        </Button>
      )}
    </div>
  );
}
