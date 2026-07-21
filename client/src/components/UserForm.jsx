import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import FormField from "./FormField";
import StatusToggle from "./StatusToggle";
import Button from "./Button";
import {
  NAME_MAX_LENGTH,
  collapseSpaces,
  validateField,
  validateForm,
  hasErrors,
} from "../utils/validators";

const EMPTY_USER = { name: "", email: "", address: "", phone: "", status: "active" };

export default function UserForm({
  initialValues = EMPTY_USER,
  mode = "add", // "add" | "edit"
  onSubmit,
}) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ ...EMPTY_USER, ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === "name") {
      nextValue = collapseSpaces(value).slice(0, NAME_MAX_LENGTH);
    }

    setValues((prev) => ({ ...prev, [name]: nextValue }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, address: true, phone: true });

    if (hasErrors(nextErrors)) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

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
        <h1 className="text-xl font-bold text-slate-900">
          {mode === "add" ? "Add New User" : "Update User"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {mode === "add"
            ? "Fields marked with an asterisk (*) are required."
            : "Update the details below and save your changes."}
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
          <FormField
            label="Name"
            name="name"
            required
            value={values.name}
            error={errors.name}
            touched={touched.name}
            maxLength={NAME_MAX_LENGTH}
            placeholder="e.g. Shiv Shankar"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            required
            value={values.email}
            error={errors.email}
            touched={touched.email}
            placeholder="name@company.com"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormField
            label="Address"
            name="address"
            as="textarea"
            required
            value={values.address}
            error={errors.address}
            touched={touched.address}
            placeholder="Street, city, state"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormField
            label="Phone"
            name="phone"
            value={values.phone}
            error={errors.phone}
            touched={touched.phone}
            placeholder="Optional"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <StatusToggle value={values.status} onChange={handleChange} />

          <div className="mt-2 flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => navigate("/")} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" icon={FiSave} loading={submitting}>
              {submitting ? "Saving..." : mode === "add" ? "Save User" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
