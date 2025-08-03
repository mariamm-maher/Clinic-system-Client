# Authentication Module

This module provides a complete authentication system for the clinic management system with role-based access control.

## Features

- ✅ **Login/Logout** with email and password
- ✅ **Role-based Access Control** (Admin, Doctor, Staff)
- ✅ **Protected Routes** with role requirements
- ✅ **JWT Token Management** with localStorage
- ✅ **Remember Me** functionality
- ✅ **Password Reset** (demo implementation)
- ✅ **User Profile Management**
- ✅ **Responsive Design** with shadcn/ui components

## Quick Start

### 1. Wrap your app with AuthProvider

```jsx
import { AuthProvider } from "@/features/auth";

function App() {
  return <AuthProvider>{/* Your app content */}</AuthProvider>;
}
```

### 2. Use the Login Page

```jsx
import { LoginPage } from "@/features/auth";

// Use as a route component
<Route path="/login" component={LoginPage} />;
```

### 3. Protect routes with ProtectedRoute

```jsx
import { ProtectedRoute } from "@/features/auth";

// Protect any route
<ProtectedRoute requiredRoles={["admin", "doctor"]}>
  <AdminDashboard />
</ProtectedRoute>

// Protect with single role
<ProtectedRoute requiredRoles={["doctor"]}>
  <DoctorDashboard />
</ProtectedRoute>
```

### 4. Use authentication in components

```jsx
import { useAuth } from "@/features/auth";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Components

### LoginForm

Complete login form with validation and error handling.

```jsx
import { LoginForm } from "@/features/auth";

<LoginForm />;
```

### LoginPage

Full-page login component ready to use as a route.

```jsx
import { LoginPage } from "@/features/auth";

<LoginPage />;
```

### ProtectedRoute

Wrapper component for protecting routes based on authentication and roles.

```jsx
import { ProtectedRoute } from "@/features/auth";

<ProtectedRoute
  requiredRoles={["admin"]}
  redirectTo="/login"
  fallback={<AccessDenied />}
>
  <SecretComponent />
</ProtectedRoute>;
```

### UserProfile

Display user information with logout functionality.

```jsx
import { UserProfile } from "@/features/auth";

// Full profile card
<UserProfile />

// Compact version
<UserProfile compact={true} />

// Without logout button
<UserProfile showLogout={false} />
```

### LogoutButton

Confirmation dialog for logout action.

```jsx
import { LogoutButton } from "@/features/auth";

<LogoutButton variant="outline" size="sm" />;
```

## Hooks

### useAuth

Main authentication hook for accessing user state and actions.

```jsx
import { useAuth } from "@/features/auth";

const {
  user, // Current user object
  isAuthenticated, // Boolean auth status
  isLoading, // Loading state
  login, // Login function
  logout, // Logout function
} = useAuth();
```

### useLoginForm

Specialized hook for login form with error handling.

```jsx
import { useLoginForm } from "@/features/auth";

const {
  login, // Login function
  isLoading, // Loading state
  error, // Error message
  clearError, // Clear error function
} = useLoginForm();
```

## Demo Credentials

The system includes demo users for testing:

| Role   | Email             | Password    |
| ------ | ----------------- | ----------- |
| Doctor | doctor@clinic.com | password123 |
| Staff  | staff@clinic.com  | password123 |
| Admin  | admin@clinic.com  | password123 |

## User Roles & Permissions

### Admin

- `manage_users` - Create, edit, delete users
- `manage_appointments` - Full appointment management
- `view_reports` - Access to system reports
- `manage_settings` - System configuration
- `view_all_patients` - Access to all patient data
- `manage_staff` - Staff management

### Doctor

- `view_appointments` - View own appointments
- `manage_appointments` - Create/edit own appointments
- `view_patients` - View assigned patients
- `create_prescriptions` - Write prescriptions
- `view_medical_records` - Access medical records

### Staff

- `view_appointments` - View all appointments
- `schedule_appointments` - Book appointments for patients
- `view_patients` - Basic patient information
- `check_in_patients` - Patient check-in process

## Utility Functions

### hasRole

Check if user has a specific role.

```jsx
import { hasRole } from "@/features/auth";

if (hasRole(user, "admin")) {
  // User is admin
}
```

### hasAnyRole

Check if user has any of the specified roles.

```jsx
import { hasAnyRole } from "@/features/auth";

if (hasAnyRole(user, ["admin", "doctor"])) {
  // User is admin or doctor
}
```

### getUserPermissions

Get array of permissions for a role.

```jsx
import { getUserPermissions } from "@/features/auth";

const permissions = getUserPermissions("doctor");
// Returns: ["view_appointments", "manage_appointments", ...]
```

## Customization

### Styling

All components use shadcn/ui components and can be customized via Tailwind CSS classes.

### API Integration

Replace the mock `authService` with real API calls:

```jsx
// services/authService.js
export const authService = {
  async login(credentials) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },
  // ... other methods
};
```

### Redirect Customization

Modify the `redirectAfterLogin` function in `useAuth.js` to customize post-login redirects.

## Security Notes

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Mock implementation - replace with secure backend authentication
- Add CSRF protection for production
- Implement proper password hashing
- Add rate limiting for login attempts
- Use HTTPS in production

## Error Handling

The system includes comprehensive error handling:

- Network errors
- Invalid credentials
- Token expiration
- Permission denied
- Loading states

All errors are displayed using toast notifications and form validation.
