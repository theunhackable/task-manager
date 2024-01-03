export function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (password.length > 20) {
    return "Password cannot exceed 20 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one digit.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  return null;
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email address.";
  }

  return null;
}

export function validateName(name) {
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) {
    return "Invalid name. Please use only letters and spaces.";
  }

  return null;
}
