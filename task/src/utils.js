import bcrypt from "bcryptjs";

const CURRENT_USER_KEY = "currentUser";

const encryptPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 8);
};

export const getCurrentUser = () => {
  const currentUserJSON = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserJSON) return currentUserJSON;
  return JSON.parse(currentUserJSON);
};

export const storeTheCurrentUser = (user) => {
  const { password } = user || {};
  const encryptedPassword = encryptPassword(password);
  const userToStore = { ...user, password: encryptedPassword };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));
};

export const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
