// Centralised validation rules, shared by AddUser and EditUser forms.

export const NAME_MAX_LENGTH = 25;
const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,15}$/;

export const collapseSpaces = (value) => value.replace(/\s{2,}/g, " ");

export const validateName = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return "Name is required.";
  if (value.length > NAME_MAX_LENGTH)
    return `Name cannot be more than ${NAME_MAX_LENGTH} characters.`;
  if (!NAME_REGEX.test(value))
    return "Name can contain only letters and spaces.";
  return "";
};

export const validateEmail = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_REGEX.test(trimmed))
    return "Please enter a valid email address.";
  return "";
};

export const validateAddress = (value) => {
  if (!value.trim()) return "Address is required.";
  return "";
};

export const validatePhone = (value) => {
  if (!value || !value.trim()) return ""; // optional
  if (!PHONE_REGEX.test(value.trim()))
    return "Please enter a valid phone number.";
  return "";
};

export const validateField = (field, value) => {
  switch (field) {
    case "name":
      return validateName(value);
    case "email":
      return validateEmail(value);
    case "address":
      return validateAddress(value);
    case "phone":
      return validatePhone(value);
    default:
      return "";
  }
};

export const validateForm = (values) => ({
  name: validateName(values.name || ""),
  email: validateEmail(values.email || ""),
  address: validateAddress(values.address || ""),
  phone: validatePhone(values.phone || ""),
});

export const hasErrors = (errors) =>
  Object.values(errors).some((message) => Boolean(message));
