import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/config/queryClient";

/**
 * React Query Provider Component
 * Wraps the app with QueryClient context and development tools
 */
export default function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools in development */}
    </QueryClientProvider>
  );
}
