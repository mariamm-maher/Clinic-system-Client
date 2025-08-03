// Mock API endpoints - replace with real API calls
const API_BASE_URL = "http://localhost:3001/api"; // Replace with your actual API

// Mock user database for demo purposes
const DEMO_USERS = [
  {
    id: 1,
    email: "doctor@clinic.com",
    password: "password123",
    name: "Dr. Ehab",
    role: "doctor",
    specialization: "Internal Medicine",
    avatar: null,
  },
  {
    id: 2,
    email: "staff@clinic.com",
    password: "password123",
    name: "Sarah Johnson",
    role: "staff",
    department: "Reception",
    avatar: null,
  },
  {
    id: 3,
    email: "admin@clinic.com",
    password: "password123",
    name: "Admin User",
    role: "admin",
    department: "Administration",
    avatar: null,
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  // Login user
  async login(credentials) {
    await delay(1000); // Simulate network delay

    const { email, password, rememberMe } = credentials;

    // Find user in demo database
    const user = DEMO_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Generate mock JWT token
    const token = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp:
          Date.now() +
          (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000), // 30 days or 1 day
      })
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword,
      expiresIn: rememberMe ? "30 days" : "1 day",
    };
  },

  // Register user
  async register(userData) {
    await delay(1200); // Simulate network delay

    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      password,
    } = userData;

    // Check if user already exists
    const existingUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = {
      id: DEMO_USERS.length + 1,
      email: email.toLowerCase(),
      password, // In real app, this should be hashed
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      address,
      role: "patient", // Default role for registration
      createdAt: new Date().toISOString(),
      avatar: null,
    };

    // Add to demo database
    DEMO_USERS.push(newUser);

    // Generate mock JWT token
    const token = btoa(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 1 day
      })
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      token,
      user: userWithoutPassword,
      expiresIn: "1 day",
    };
  },

  // Logout user
  async logout() {
    await delay(500);
    // In a real app, you might call an API to invalidate the token
    return { success: true };
  },

  // Validate token
  async validateToken(token) {
    await delay(300);

    try {
      const decoded = JSON.parse(atob(token));

      // Check if token is expired
      if (decoded.exp < Date.now()) {
        throw new Error("Token expired");
      }

      // Find user
      const user = DEMO_USERS.find((u) => u.id === decoded.userId);
      if (!user) {
        throw new Error("User not found");
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error("Invalid token");
    }
  },

  // Get current user
  async getCurrentUser() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found");
    }

    return this.validateToken(token);
  },

  // Refresh token
  async refreshToken() {
    await delay(500);

    const currentToken = localStorage.getItem("authToken");
    if (!currentToken) {
      throw new Error("No token to refresh");
    }

    try {
      const decoded = JSON.parse(atob(currentToken));

      // Generate new token with extended expiry
      const newToken = btoa(
        JSON.stringify({
          ...decoded,
          exp: Date.now() + 24 * 60 * 60 * 1000, // 1 day
        })
      );

      return {
        token: newToken,
        expiresIn: "1 day",
      };
    } catch (error) {
      throw new Error("Failed to refresh token");
    }
  },

  // Change password
  async changePassword(currentPassword, newPassword) {
    await delay(800);

    const user = await this.getCurrentUser();
    const dbUser = DEMO_USERS.find((u) => u.id === user.id);

    if (dbUser.password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    // In a real app, you would hash the password and save it to the database
    dbUser.password = newPassword;

    return { success: true };
  },

  // Request password reset
  async requestPasswordReset(email) {
    await delay(1000);

    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      // Don't reveal if email exists or not for security
      return {
        success: true,
        message: "If the email exists, a reset link has been sent.",
      };
    }

    // In a real app, you would send an email with a reset link
    return {
      success: true,
      message: "Password reset link has been sent to your email.",
      // For demo purposes, include the reset token
      resetToken: btoa(
        JSON.stringify({ email, exp: Date.now() + 60 * 60 * 1000 })
      ), // 1 hour
    };
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    await delay(800);

    try {
      const decoded = JSON.parse(atob(token));

      if (decoded.exp < Date.now()) {
        throw new Error("Reset token has expired");
      }

      const user = DEMO_USERS.find((u) => u.email === decoded.email);
      if (!user) {
        throw new Error("Invalid reset token");
      }

      // Update password
      user.password = newPassword;

      return { success: true };
    } catch (error) {
      throw new Error("Invalid or expired reset token");
    }
  },
};

// Helper function to check if user has specific role
export const hasRole = (user, role) => {
  return user && user.role === role;
};

// Helper function to check if user has any of the specified roles
export const hasAnyRole = (user, roles) => {
  return user && roles.includes(user.role);
};

// Helper function to get user permissions based on role
export const getUserPermissions = (role) => {
  const permissions = {
    admin: [
      "manage_users",
      "manage_appointments",
      "view_reports",
      "manage_settings",
      "view_all_patients",
      "manage_staff",
    ],
    doctor: [
      "view_appointments",
      "manage_appointments",
      "view_patients",
      "create_prescriptions",
      "view_medical_records",
    ],
    staff: [
      "view_appointments",
      "schedule_appointments",
      "view_patients",
      "check_in_patients",
    ],
  };

  return permissions[role] || [];
};
