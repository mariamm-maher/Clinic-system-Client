// here we call the axios config and the API calls for the login, register and reset password
import apiClient from "@/config/axiosConfig";

export const register = async (userData) => {
  try {
    const response = await apiClient.post("/api/auth/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/api/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Send forgot password email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} API response
 */
export const forgetPassword = async (email) => {
  try {
    const response = await apiClient.post("/api/auth/forgot-password", {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("Forget Password API Error:", error);

    throw error.response.data;
  }
};

export const refreshAuthToken = async (refreshToken) => {
  try {
    const response = await apiClient.post("/api/auth/refresh", {
      refreshToken,
    });

    return {
      success: true,
      data: response.data,
      message: "Token refreshed successfully",
    };
  } catch (error) {
    console.error("Refresh Token API Error:", error);

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          return {
            success: false,
            error: "Invalid or expired refresh token",
          };
        case 403:
          return {
            success: false,
            error: "Refresh token not provided",
          };
        default:
          return {
            success: false,
            error: data?.message || "Token refresh failed",
          };
      }
    } else if (error.request) {
      return {
        success: false,
        error: "Network error - please check your connection",
      };
    } else {
      return {
        success: false,
        error: "Token refresh request failed",
      };
    }
  }
};

/**
 * Confirm password reset with new password
 * @param {string} token - Reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} API response
 */
export const confirmPasswordReset = async (token, newPassword) => {
  try {
    const response = await apiClient.post("/api/auth/reset-password", {
      token,
      newPassword,
    });

    return response.data;
  } catch (error) {
    console.error("Confirm Password Reset API Error:", error);
    throw error.response.data;
  }
};

//google redirect URL
