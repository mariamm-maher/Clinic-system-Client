// Appointment booking service
class AppointmentService {
  static async bookAppointment(appointmentData) {
    try {
      // In a real application, this would make an API call
      // For now, we'll simulate the API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            appointmentId: `APPT-${Date.now()}`,
            message: "Appointment booked successfully",
          });
        }, 1000);
      });

      return response;
    } catch (error) {
      throw new Error("Failed to book appointment. Please try again.");
    }
  }

  static async getAvailableTimeSlots(date) {
    try {
      // Simulate fetching available time slots
      const allSlots = [
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM",
      ];

      // Simulate some slots being unavailable
      const unavailableSlots = ["10:00 AM", "2:30 PM", "4:00 PM"];

      return allSlots.filter((slot) => !unavailableSlots.includes(slot));
    } catch (error) {
      throw new Error("Failed to fetch available time slots.");
    }
  }

  static validateAppointmentData(data) {
    const errors = {};

    if (!data.name?.trim()) {
      errors.name = "Name is required";
    }

    if (!data.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!data.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(data.phone) &&
      !/^\d{10}$/.test(data.phone.replace(/\D/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.appointmentDate) {
      errors.appointmentDate = "Appointment date is required";
    } else {
      const selectedDate = new Date(data.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.appointmentDate = "Appointment date cannot be in the past";
      }
    }

    if (!data.appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static formatPhoneNumber(phone) {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return phone;
  }
}

export default AppointmentService;
