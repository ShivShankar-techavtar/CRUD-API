import React from "react";
import { FiSearch, FiUserPlus, FiFilter, FiArrowDownCircle } from "react-icons/fi";
import Button from "./Button";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
];

export default function DashboardHeader({
  totalUsers,
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  onAdd,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          User Management Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Total Users: <span className="font-semibold text-slate-700">{totalUsers}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap lg:justify-end">
        <div className="relative w-full sm:w-64">
          <FiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name, email, phone…"
            aria-label="Search users"
            className="input-base pl-9"
          />
        </div>

        <div className="relative">
          <FiFilter
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={15}
            aria-hidden="true"
          />
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
            className="input-base appearance-none pl-9 pr-8 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <FiArrowDownCircle
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={15}
            aria-hidden="true"
          />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort users"
            className="input-base appearance-none pl-9 pr-8 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Button icon={FiUserPlus} onClick={onAdd} className="sm:ml-auto lg:ml-0 shrink-0">
          Add User
        </Button>
      </div>
    </div>
  );
}
