import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Create a new QueryClient instance with global configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh (5 minutes)
      staleTime: 5 * 60 * 1000,
      // Cache time: how long data stays in cache when not being used (10 minutes)
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times with exponential backoff
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus (good for data consistency)
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: "always",
    },
    mutations: {
      // Global error handling for mutations
      onError: (error) => {
        console.error("Mutation error:", error); // Handle different types of errors
        if (error?.response?.data?.message) {
          // Backend validation errors
          const errorMessage = error.response.data.message;
          if (Array.isArray(errorMessage)) {
            const formattedErrors = errorMessage
              .map((err) => `• ${err}`)
              .join("\n");
            toast.error(formattedErrors, {
              duration: 6000,
              style: {
                minWidth: "350px",
                maxWidth: "500px",
                whiteSpace: "pre-line",
              },
            });
          } else {
            toast.error(errorMessage);
          }
        } else if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      },
      // Retry mutations once on network errors
      retry: (failureCount, error) => {
        if (error?.code === "NETWORK_ERROR" && failureCount < 1) {
          return true;
        }
        return false;
      },
    },
  },
});

// Query key factory for consistent key management
export const queryKeys = {
  // Appointments
  appointments: {
    all: ["appointments"],
    lists: () => [...queryKeys.appointments.all, "list"],
    list: (filters) => [...queryKeys.appointments.lists(), { filters }],
    details: () => [...queryKeys.appointments.all, "detail"],
    detail: (id) => [...queryKeys.appointments.details(), id],
  },
  // Patients
  patients: {
    all: ["patients"],
    lists: () => [...queryKeys.patients.all, "list"],
    list: (filters) => [...queryKeys.patients.lists(), { filters }],
    details: () => [...queryKeys.patients.all, "detail"],
    detail: (id) => [...queryKeys.patients.details(), id],
  },
  // Doctor
  doctor: {
    all: ["doctor"],
    profile: () => [...queryKeys.doctor.all, "profile"],
    schedule: () => [...queryKeys.doctor.all, "schedule"],
    availability: (date) => [...queryKeys.doctor.all, "availability", date],
  },
};

// Invalidation helpers
export const invalidateQueries = {
  appointments: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all }),
  patients: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.patients.all }),
  doctor: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.doctor.all }),
};
