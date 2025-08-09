// Doctor services for staff management
import apiClient from "@/config/axiosConfig";

/**
 * Create a new staff member
 * @param {Object} staffData - Staff information in the required API format
 * @returns {Promise<Object>} Created staff member data
 */
export const createStaff = async (staffData) => {
  try {
    // Check if we need to handle file uploads
    const hasFiles = 
      staffData.identification?.nationalIDPhoto?.front ||
      staffData.identification?.nationalIDPhoto?.back ||
      staffData.professional?.qualifications?.some(q => q.certificatePhoto);

    if (hasFiles) {
      // Use FormData for file uploads
      const formData = new FormData();
      
      // Add JSON data as a string
      const jsonData = {
        name: staffData.name,
        email: staffData.email,
        password: staffData.password,
        personalInfo: staffData.personalInfo,
        identification: {
          nationalID: staffData.identification.nationalID
        },
        professional: {
          ...staffData.professional,
          qualifications: staffData.professional.qualifications.map(q => ({
            degree: q.degree,
            institution: q.institution,
            year: q.year
          }))
        }
      };
      
      formData.append('data', JSON.stringify(jsonData));
      
      // Add files
      if (staffData.identification?.nationalIDPhoto?.front) {
        formData.append('nationalIDFront', staffData.identification.nationalIDPhoto.front);
      }
      if (staffData.identification?.nationalIDPhoto?.back) {
        formData.append('nationalIDBack', staffData.identification.nationalIDPhoto.back);
      }
      
      // Add qualification certificate photos
      staffData.professional.qualifications.forEach((qual, index) => {
        if (qual.certificatePhoto) {
          formData.append(`qualificationCert_${index}`, qual.certificatePhoto);
        }
      });

      const response = await apiClient.post("/api/staff", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } else {
      // Send as JSON if no files
      const response = await apiClient.post("/api/staff", staffData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    }
  } catch (error) {
    // console.error("Error creating staff:", error);
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
