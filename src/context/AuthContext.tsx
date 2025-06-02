"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: any;
  loading: boolean;
  login: (user: any, token: string, expiration: number) => void;
  logout: () => void;
  refreshUser: () => Promise<void>; // Add refreshUser method
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes of inactivity
  const LOGOUT_TIMEOUT = 10 * 60 * 1000; // 10 minutes for logout after inactivity

  // Clear the logout timer
  const clearLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      console.log("Logout timer cleared.");
    }
  };

  // Clear the inactivity timer
  const clearInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      console.log("Inactivity timer cleared.");
    }
  };

  // Schedule automatic logout
  const scheduleAutoLogout = () => {
    clearLogoutTimer();
    console.log(`Scheduling logout in ${LOGOUT_TIMEOUT / 1000} seconds.`);
    const timer = setTimeout(() => {
      logout();
    }, LOGOUT_TIMEOUT);
    setLogoutTimer(timer);
  };

  // Handle user activity
  const handleUserActivity = () => {
    console.log("User activity detected. Resetting inactivity timer.");
    clearInactivityTimer();
    clearLogoutTimer();

    // Start inactivity timer
    const timer = setTimeout(() => {
      console.log("Inactivity detected. Starting logout timer.");
      scheduleAutoLogout();
    }, INACTIVITY_TIMEOUT);
    setInactivityTimer(timer);
  };

  // Fetch the latest user data from the profile route
  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      return;
    }
    try {
      const response = await fetch("/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data); // Update the user state with the latest data
        localStorage.setItem("user", JSON.stringify(data)); // Update localStorage
        console.log("User data refreshed:", data);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiration");
        console.error("Failed to refresh user data:", await response.json());
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiration");
      console.error("Error refreshing user data:", error);
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (token && userData && tokenExpiration) {
        const expiration = parseInt(tokenExpiration, 10);
        if (Date.now() < expiration) {
          setIsLoggedIn(true);
          setUser(JSON.parse(userData));
          handleUserActivity(); // Start tracking activity
        } else {
          logout();
        }
      }
      setLoading(false); // Set loading to false after initialization
    };

    initializeAuth();

    const handleStorageChange = () => {
      initializeAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      clearLogoutTimer();
      clearInactivityTimer();
    };
  }, []);

  const login = (user: any, token: string, expiration: number) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tokenExpiration", expiration.toString());
    handleUserActivity(); // Start tracking activity
  };

  const logout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiration");
    clearLogoutTimer();
    clearInactivityTimer();

    console.log("Redirecting to home page...");
    window.location.href = "/"; // Redirect to home page with original navbar

    window.dispatchEvent(new Event("storage"));
  };

  const value = useMemo(
    () => ({ isLoggedIn, user, loading, login, logout, refreshUser }),
    [isLoggedIn, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};