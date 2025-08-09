"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { User } from "../../../types/user";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch("https://angkutin.vercel.app/v1/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data.data);
        setUser(data.data);
      } else {
        Cookies.remove("token");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("https://angkutin.vercel.app/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      // console.log(data.data);
      Cookies.set("token", data.data.tokens.access.token, { expires: 7 });
      setToken(data.data.tokens.access.token);
      // await fetchUserProfile(data.data.tokens.access);
      setUser(data.data.user);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("https://angkutin.vercel.app/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Register failed");

      const data = await res.json();
      Cookies.set("token", data.token, { expires: 7 });
      await fetchUserProfile(data.token);
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, setUser, token, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
