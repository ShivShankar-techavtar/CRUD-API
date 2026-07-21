import React from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import IconButton from "./IconButton";
import { formatDate } from "../utils/format";

const COLUMNS = ["User", "Email", "Phone", "Address", "Status", "Created", "Actions"];

export default function UserTable({ users, onRequestDelete, deletingId, onToggleStatus, togglingId }) {
  const navigate = useNavigate();

  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[820px] text-sm text-left">
        <thead>
          <tr className="border-b border-slate-100">
            {COLUMNS.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr
              key={user._id}
              className="data-row transition-colors duration-150 animate-fadeIn"
            >
              <td className="px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} />
                  <span className="font-medium text-slate-800">{user.name}</span>
                </div>
              </td>
              <td className="px-6 py-3.5 text-slate-600">{user.email}</td>
              <td className="px-6 py-3.5 text-slate-600">{user.phone || "—"}</td>
              <td className="px-6 py-3.5 text-slate-600 max-w-[220px] truncate" title={user.address}>
                {user.address}
              </td>
              <td className="px-6 py-3.5">
                <StatusBadge
                  status={user.status}
                  disabled={togglingId === user._id}
                  onClick={() => onToggleStatus(user)}
                />
              </td>
              <td className="px-6 py-3.5 text-slate-500">{formatDate(user.createdAt)}</td>
              <td className="px-6 py-3.5">
                <div className="flex items-center gap-1">
                  <IconButton
                    icon={FiEye}
                    label="View"
                    tone="view"
                    onClick={() => navigate(`/view/${user._id}`)}
                  />
                  <IconButton
                    icon={FiEdit2}
                    label="Edit"
                    tone="edit"
                    onClick={() => navigate(`/update/${user._id}`)}
                  />
                  <IconButton
                    icon={FiTrash2}
                    label="Delete"
                    tone="delete"
                    loading={deletingId === user._id}
                    onClick={() => onRequestDelete(user)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
