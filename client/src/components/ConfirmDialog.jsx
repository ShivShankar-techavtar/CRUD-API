import React from "react";
import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete User?",
  message = "Are you sure you want to delete this user? This action cannot be undone.",
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p>{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
