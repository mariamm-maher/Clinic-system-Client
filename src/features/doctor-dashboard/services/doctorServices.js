// Doctor services for staff management
import apiClient from "@/config/axiosConfig";

/**
 * Create a new staff member
 * @param {Object} staffData - Staff information
 * @param {string} staffData.name - Full name of staff member
 * @param {string} staffData.email - Email address
 * @param {string} staffData.phone - Contact phone number
 * @param {string} staffData.role - Staff role/position
 * @param {string} staffData.specialization - Area of specialization if applicable
 * @param {string} staffData.licenseNumber - Professional license number if applicable
 * @param {File} staffData.avatar - Staff profile photo
 * @param {File[]} staffData.documents - Professional documents/certifications
 * @returns {Promise<Object>} Created staff member data
 */
export const createStaff = async (staffData) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();

    // Add basic staff information
    formData.append("name", staffData.name);
    formData.append("email", staffData.email);
    formData.append("phone", staffData.phone);
    formData.append("role", staffData.role);
    formData.append("specialization", staffData.specialization || "");
    formData.append("licenseNumber", staffData.licenseNumber || "");

    // Add profile photo if provided
    if (staffData.avatar) {
      formData.append("avatar", staffData.avatar);
    }

    // Add professional documents if provided
    if (staffData.documents && staffData.documents.length > 0) {
      staffData.documents.forEach((doc, index) => {
        formData.append(`documents[${index}]`, doc);
      });
    }

    const response = await apiClient.post("/api/staff", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating staff:", error);
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
    // Create FormData for file upload
    const formData = new FormData();

    // Add updated fields
    Object.keys(staffData).forEach((key) => {
      if (key === "avatar" || key === "documents") {
        return; // Handle files separately
      }
      formData.append(key, staffData[key] || "");
    });

    // Add new profile photo if provided
    if (staffData.avatar) {
      formData.append("avatar", staffData.avatar);
    }

    // Add new documents if provided
    if (staffData.documents && staffData.documents.length > 0) {
      staffData.documents.forEach((doc, index) => {
        formData.append(`documents[${index}]`, doc);
      });
    }

    const response = await apiClient.put(`/api/staff/${staffId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
