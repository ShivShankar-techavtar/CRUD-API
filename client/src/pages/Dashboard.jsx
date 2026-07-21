import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiUserCheck, FiUserX, FiUserPlus as FiNewUser } from "react-icons/fi";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import UserTable from "../components/UserTable";
import SkeletonTable from "../components/SkeletonTable";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import useUsers from "../hooks/useUsers";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    users,
    stats,
    loading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    removeUser,
    toggleStatus,
  } = useUsers();

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeletingId(pendingDelete._id);
    const ok = await removeUser(pendingDelete._id);
    setDeletingId(null);
    if (ok) setPendingDelete(null);
  };

  const handleToggleStatus = async (user) => {
    setTogglingId(user._id);
    await toggleStatus(user);
    setTogglingId(null);
  };

  const isFiltered = Boolean(search || status);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardHeader
        totalUsers={stats.total}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
        onAdd={() => navigate("/add")}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiUsers} label="Total Users" value={stats.total} tone="primary" />
        <StatCard icon={FiUserCheck} label="Active Users" value={stats.active} tone="success" />
        <StatCard icon={FiUserX} label="Inactive Users" value={stats.inactive} tone="slate" />
        <StatCard icon={FiNewUser} label="New (7 days)" value={stats.newThisWeek} tone="warning" />
      </div>

      <div className="mt-6">
        {loading ? (
          <SkeletonTable />
        ) : error ? (
          <div className="card p-6 text-center text-sm text-danger">{error}</div>
        ) : users.length === 0 ? (
          <EmptyState onAdd={() => navigate("/add")} isFiltered={isFiltered} />
        ) : (
          <>
            <UserTable
              users={users}
              onRequestDelete={setPendingDelete}
              deletingId={deletingId}
              onToggleStatus={handleToggleStatus}
              togglingId={togglingId}
            />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        loading={Boolean(deletingId)}
        message={
          pendingDelete
            ? `Are you sure you want to delete ${pendingDelete.name}? This action cannot be undone.`
            : ""
        }
      />
    </div>
  );
}
