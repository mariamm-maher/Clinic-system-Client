import { create } from "zustand";
import {
  getAllStaff,
  getStaffById,
  updateStaff,
} from "@/features/doctor-dashboard/services/doctorServices";

// Helper to normalize staff member shape used by the UI
const transformStaff = (member) => {
  // Handle both list view (simplified) and detail view (full data) formats
  if (member?.user) {
    // Full API response format (from fetchStaffById)
    return {
      id: member._id,
      name: member.user.name || "N/A",
      role: member.professional?.position || member.user.role || "N/A",
      department: member.professional?.department || "N/A", 
      email: member.user.email || "N/A",
      phone: member.personalInfo?.phone || "N/A",
      status: member.isActive ? "active" : "inactive",
      shift: member.shift || "morning",
      avatar: member.user.avatar || null,
      // Keep full data structure for detail views
      fullData: member,
    };
  } else {
    // Simplified format (from fetchStaff list)
    return {
      id: member?._id ?? member?.id ?? "",
      name: member?.user?.name || "N/A",
      role: member?.professional?.position || "N/A",
      department: member?.professional?.department || "N/A",
      email: member?.user?.email || "N/A",
      phone: member?.personalInfo?.phone || "N/A",
      status: member?.isActive ? "active" : "inactive",
      shift: member?.shift || "morning",
      avatar: member?.user?.avatar || null,
    };
  }
};

export const useStaffStore = create((set, get) => ({
  staff: [],
  selectedStaff: null,
  isLoading: false,
  error: null,

  // Fetch all staff members
  fetchStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getAllStaff();

      // Support both shapes: API may return array directly or as { data: [...] }
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      if (!Array.isArray(list)) {
        throw new Error("Received invalid data format from the server.");
      }

      const transformedData = list.map(transformStaff);
      set({ staff: transformedData, isLoading: false });
    } catch (err) {
      console.error("Detailed error fetching staff:", err);
      const errorMessage = err?.message || "Failed to fetch staff.";
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Fetch a single staff member by ID and set as selected
  fetchStaffById: async (staffId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getStaffById(staffId);
      set({ isLoading: false });
      return response.data.staff;
    } catch (err) {
      console.error("Error fetching staff by id:", err);
      const errorMessage = err?.message || "Failed to fetch staff member.";
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  // Update staff member by ID
  updateStaffMember: async (staffId, updates) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateStaff(staffId, updates);
      set({ isLoading: false });
      console.log(response , "from the store");
      console.log(response.data , "from the store");
      return response.data;
    } catch (err) {
      console.error("Error updating staff member:", err);
      const errorMessage = err?.message || "Failed to update staff member.";
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  toggleStaffStatus: async (staffId, currentStatus) => {
    set({ isLoading: true, error: null });
    try {
      const updates = { isActive: currentStatus === 'active' ? false : true };
      await updateStaff(staffId, updates);
      // Refetch all staff to ensure list is up-to-date
      get().fetchStaff();
    } catch (err) {
      console.error("Error toggling staff status:", err);
      const errorMessage = err?.message || "Failed to toggle staff status.";
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  // Activate a staff member
  activateStaff: async (staffId) => {
    return await get().updateStaffMember(staffId, { isActive: true });
  },

  // Deactivate a staff member
  deactivateStaff: async (staffId) => {
    return await get().updateStaffMember(staffId, { isActive: false });
  },

  // Local state helpers
  setSelectedStaff: (staff) => set({ selectedStaff: staff }),
  clearError: () => set({ error: null }),
}));
