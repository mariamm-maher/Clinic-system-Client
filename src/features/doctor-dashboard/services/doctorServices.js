// Doctor services for staff management
import apiClient from "@/config/axiosConfig";

/**
 * Create a new staff member
 * @param {Object} staffData - Staff information in the required API format
 * @returns {Promise<Object>} Created staff member data
 */
export const createStaff = async (staffData) => {
  try {
 

    const response = await apiClient.post("/api/staff", staffData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating staff from the services :", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Get all staff members
 * @returns {Promise<Array>} List of staff members
 */
export const getAllStaff = async () => {
  try {
    const response = await apiClient.get("/api/staff");
    return response.data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Get a staff member by ID
 * @param {string} staffId - Staff member ID
 * @returns {Promise<Object>} Staff member data
 */
export const getStaffById = async (staffId) => {
  try {
    const response = await apiClient.get(`/api/staff/${staffId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff member:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Update a staff member
 * @param {string} staffId - Staff member ID
 * @param {Object} staffData - Updated staff information
 * @returns {Promise<Object>} Updated staff member data
 */
export const updateStaff = async (staffId, staffData) => {
  try {
    const response = await apiClient.put(`/api/staff/${staffId}`, staffData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating staff member:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a staff member
 * @param {string} staffId - Staff member ID
 * @returns {Promise<void>}
 */
export const deleteStaff = async (staffId) => {
  try {
    await apiClient.delete(`/api/staff/${staffId}`);
  } catch (error) {
    console.error("Error deleting staff member:", error);
    throw error.response?.data || error.message;
  }
};
