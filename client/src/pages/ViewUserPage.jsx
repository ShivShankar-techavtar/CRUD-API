import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiEdit2, FiTrash2, FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import { getUserById, deleteUser, updateUser } from "../services/api";
import { formatDate } from "../utils/format";

export default function ViewUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);

  useEffect(() => {
    let active = true;
    getUserById(id)
      .then((data) => {
        if (active) setUser(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const handleToggleStatus = async () => {
    const nextStatus = user.status === "active" ? "inactive" : "active";
    setTogglingStatus(true);
    try {
      const data = await updateUser(id, { ...user, status: nextStatus });
      setUser(data.user || { ...user, status: nextStatus });
      toast.success(`Marked as ${nextStatus}.`);
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setTogglingStatus(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const data = await deleteUser(id);
      toast.success(data.message || "User deleted successfully.");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-danger">{error}</div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-slate-400">
        Loading user…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <FiArrowLeft size={15} aria-hidden="true" />
        Back to Dashboard
      </button>

      <div className="card p-6 sm:p-8 animate-slideUp">
        <div className="flex flex-col items-center gap-3 border-b border-slate-100 pb-6 text-center sm:flex-row sm:items-center sm:text-left">
          <Avatar name={user.name} size="lg" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{user.name}</h1>
            <div className="mt-1">
              <StatusBadge
                status={user.status}
                disabled={togglingStatus}
                onClick={handleToggleStatus}
              />
            </div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <FiMail className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Email</dt>
              <dd className="text-sm text-slate-700">{user.email}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiPhone className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Phone</dt>
              <dd className="text-sm text-slate-700">{user.phone || "—"}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:col-span-2">
            <FiMapPin className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Address</dt>
              <dd className="text-sm text-slate-700">{user.address}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiClock className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Created</dt>
              <dd className="text-sm text-slate-700">{formatDate(user.createdAt)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiClock className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Updated</dt>
              <dd className="text-sm text-slate-700">{formatDate(user.updatedAt)}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-6">
          <Button variant="secondary" icon={FiArrowLeft} onClick={() => navigate("/")}>
            Back
          </Button>
          <Button variant="secondary" icon={FiEdit2} onClick={() => navigate(`/update/${id}`)}>
            Edit
          </Button>
          <Button variant="danger" icon={FiTrash2} onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
      />
    </div>
  );
}
