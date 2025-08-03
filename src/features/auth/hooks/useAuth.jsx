import { useState, useContext, createContext, useEffect } from "react";
import { authService } from "../services/authService";
import { toast } from "sonner";

// Create Auth Context
const AuthContext = createContext({});

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const userData = await authService.validateToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);

      // Store auth data
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userData", JSON.stringify(response.user));

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success(`Welcome back, ${response.user.name}!`);

      // Redirect based on user role
      redirectAfterLogin(response.user.role);

      return response;
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);

      // Store auth data
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userData", JSON.stringify(response.user));

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success(`Welcome to our clinic, ${response.user.name}!`);

      // Redirect to patient dashboard
      window.location.href = "/patient/dashboard";

      return response;
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully");

      // Redirect to login or home
      window.location.href = "/login";
    }
  };

  const redirectAfterLogin = (role) => {
    switch (role) {
      case "admin":
        window.location.href = "/admin/dashboard";
        break;
      case "doctor":
        window.location.href = "/doctor/dashboard";
        break;
      case "staff":
        window.location.href = "/staff/dashboard";
        break;
      default:
        window.location.href = "/dashboard";
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Hook for login form specifically
export function useLoginForm() {
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleLogin = async (formData) => {
    setError("");

    try {
      await login(formData);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  return {
    login: handleLogin,
    isLoading,
    error,
    clearError: () => setError(""),
  };
}

// Hook for registration form specifically
export function useRegisterForm() {
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();

  const handleRegister = async (formData) => {
    setError("");

    try {
      await register(formData);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return {
    register: handleRegister,
    isLoading,
    error,
    clearError: () => setError(""),
  };
}
