import apiClient from "@/config/axiosConfig";

/**
 * Book an appointment for a patient
 * @param {Object} appointmentData - The appointment booking data
 * @param {string} appointmentData.patientName - Patient's full name
 * @param {string} appointmentData.patientPhone - Patient's phone number
 * @param {string} appointmentData.day - Appointment day (e.g., "Sunday")
 * @param {string} appointmentData.time - Appointment time (e.g., "12:30")
 * @param {string} appointmentData.notes - Additional notes or reason for visit
 * @returns {Promise<Object>} - API response with booking confirmation
 */
export const bookAppointment = async (appointmentData) => {
  try {
    // Prepare the request payload
    const payload = {
      patientName: appointmentData.patientName,
      patientPhone: appointmentData.patientPhone,
      day: appointmentData.day,
      time: appointmentData.time,
      createdFrom: "website",
      notes: appointmentData.notes || "", // Default to empty string if not provided
    };
    const response = await apiClient.post("/api/booking", payload);
    return {
      success: true,
      data: response.data,
      message: "Appointment booked successfully",
    };
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    throw error.response.data;
  }
};
