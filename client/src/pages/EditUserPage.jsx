import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import UserForm from "../components/UserForm";
import { getUserById, updateUser } from "../services/api";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    getUserById(id)
      .then((data) => {
        if (active) setInitialValues(data);
      })
      .catch((error) => {
        if (active) setLoadError(error.message);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const data = await updateUser(id, values);
      toast.success(data.message || "User updated successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  if (loadError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-danger">
        {loadError}
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-slate-400">
        Loading user…
      </div>
    );
  }

  return <UserForm mode="edit" initialValues={initialValues} onSubmit={handleSubmit} />;
}
