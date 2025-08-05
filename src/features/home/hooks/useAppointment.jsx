import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { invalidateQueries } from "@/config/queryClient";
import { bookAppointment } from "@/features/home/services/patientService";

/**
 * Hook for creating a new appointment
 * @returns {Object} mutation object with mutate, mutateAsync, isPending, error, etc.
 */
export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (appointmentData) => {
      const result = await bookAppointment(appointmentData);
      return result.data;
    },
    onSuccess: (data) => {
      // Show success toast
      toast.success(
        "Appointment booked successfully! We'll contact you shortly to confirm your appointment."
      );

      // Invalidate and refetch appointment queries
      invalidateQueries.appointments();

      console.log("✅ Appointment booking successful:", data);
    },
    onError: (error) => {
      console.error("❌ Appointment booking failed:", error);

      // Handle specific error cases
      if (error?.details && Array.isArray(error.details)) {
        const errorList = error.details.map(
          (detail) => detail.message || detail
        );
        const formattedErrors = errorList.map((err) => `• ${err}`).join("\n");
        toast.error(formattedErrors, {
          duration: 6000,
          style: {
            minWidth: "350px",
            maxWidth: "500px",
            whiteSpace: "pre-line",
          },
        });
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });
};
