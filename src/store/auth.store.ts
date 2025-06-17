import { create } from "zustand";

export type AuthState = {
  token: string | null;
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  login: (
    token: string,
    user: { name: string; email: string; avatar: string }
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const authStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, isAuthenticated: true, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
