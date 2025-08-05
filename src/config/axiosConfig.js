import axios from "axios";

// Base URL for the API server
const API_BASE_URL = "http://localhost:4000";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // TODO: Add authentication token to headers
//     // const token = localStorage.getItem('accessToken');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }

//     // TODO: Add any other request modifications here
//     // - API key headers
//     // - User agent
//     // - Request ID for tracking

//     console.log("🚀 API Request:", {
//       method: config.method?.toUpperCase(),
//       url: config.url,
//       baseURL: config.baseURL,
//       headers: config.headers,
//     });

//     return config;
//   },
//   (error) => {
//     console.error("❌ Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// Response interceptor
// apiClient.interceptors.response.use(
//   (response) => {
//     // TODO: Handle successful responses
//     // - Log response data in development
//     // - Transform response data if needed

//     console.log("✅ API Response:", {
//       status: response.status,
//       url: response.config.url,
//       data: response.data,
//     });

//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // TODO: Handle different error scenarios
//     if (error.response) {
//       const { status, data } = error.response;

//       console.error("❌ API Error Response:", {
//         status,
//         url: originalRequest?.url,
//         data,
//       });

//       // TODO: Handle specific status codes
//       switch (status) {
//         case 401:
//           // TODO: Handle unauthorized - refresh token or redirect to login
//           // const refreshToken = localStorage.getItem('refreshToken');
//           // if (refreshToken && !originalRequest._retry) {
//           //   originalRequest._retry = true;
//           //   try {
//           //     // Attempt to refresh token
//           //     // const newToken = await refreshAuthToken(refreshToken);
//           //     // localStorage.setItem('accessToken', newToken);
//           //     // originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           //     // return apiClient(originalRequest);
//           //   } catch (refreshError) {
//           //     // Refresh failed, redirect to login
//           //     // localStorage.removeItem('accessToken');
//           //     // localStorage.removeItem('refreshToken');
//           //     // window.location.href = '/login';
//           //   }
//           // }
//           break;

//         case 403:
//           // TODO: Handle forbidden - insufficient permissions
//           console.warn("⚠️ Access forbidden - insufficient permissions");
//           break;

//         case 404:
//           // TODO: Handle not found
//           console.warn("⚠️ Resource not found");
//           break;

//         case 422:
//           // TODO: Handle validation errors
//           console.warn("⚠️ Validation error:", data);
//           break;

//         case 429:
//           // TODO: Handle rate limiting
//           console.warn("⚠️ Rate limit exceeded");
//           break;

//         case 500:
//         case 502:
//         case 503:
//         case 504:
//           // TODO: Handle server errors
//           console.error("🔥 Server error - please try again later");
//           break;

//         default:
//           console.error("❌ Unexpected error:", status, data);
//       }
//     } else if (error.request) {
//       // Network error - no response received
//       console.error("🌐 Network Error:", error.message);
//       // TODO: Handle network errors
//       // - Show offline message
//       // - Retry mechanism
//       // - Queue requests for later
//     } else {
//       // Request setup error
//       console.error("⚙️ Request Setup Error:", error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// Export the configured axios instance
export default apiClient;

// Export base URL for use in other files
export { API_BASE_URL };
