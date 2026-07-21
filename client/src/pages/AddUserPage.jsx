import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserForm from "../components/UserForm";
import { createUser } from "../services/api";

export default function AddUserPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const data = await createUser(values);
      toast.success(data.message || "User added successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return <UserForm mode="add" onSubmit={handleSubmit} />;
}
