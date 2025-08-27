import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { toast } from "sonner";
import { createStaff } from "@/features/doctor-dashboard/services/doctorServices";

// Constants
export const TOTAL_STEPS = 4;
const STORAGE_KEY = "staff-form-data";

// Initial form data structure
const initialFormData = {
  basicInfo: {
    name: "",
    email: "",
    password: "",
    avatar: null,
    avatarPreview: null,
  },
  personalInfo: {
    phone: "",
    age: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
   
    },
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
  },
  professionalInfo: {
    department: "",
    position: "",
    experience: {
      years: "",
    },
    qualifications: [],
    tempQualification: {
      degree: "",
      institution: "",
      year: "",
      certificatePhoto: null,
    },
  },
  identification: {
    nationalID: "",
    nationalIDPhoto: {
      front: null,
      back: null,
    },
  },
  review: {},
};

// Load initial data from sessionStorage or use default
const loadInitialData = () => {
  try {
    const savedData = sessionStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to load form data from sessionStorage:", error);
  }
  return initialFormData;
};

// Transform form data to API format
const transformFormDataForAPI = (formData) => {
  return {
    name: formData.basicInfo.name,
    email: formData.basicInfo.email,
    password: formData.basicInfo.password,
    personalInfo: {
      phone: formData.personalInfo.phone,
      age: parseInt(formData.personalInfo.age) || 0,
      gender: formData.personalInfo.gender,
      address: {
        street: formData.personalInfo.address.street,
        city: formData.personalInfo.address.city
      },
    },
    identification: {
      nationalID: formData.identification.nationalID,
      nationalIDPhoto: {
        front: "/uploads/id-front.jpg",
        back: "/uploads/id-back.jpg"
      }
    }
  };
};

export const useStaffFormStore = create(
  subscribeWithSelector((set, get) => ({
    formData: loadInitialData(),
    errors: {},
    isLoading: false,
    isSubmitted: false,
    // Form data management
    updateFormData: (section, data) =>
      set((state) => ({
        formData: {
          ...state.formData,
          [section]: {
            ...state.formData[section],
            ...data,
          },
        },
      })),

    // Deep update for nested objects
    updateNestedFormData: (path, value) =>
      set((state) => {
        const keys = path.split(".");
        const newFormData = { ...state.formData };
        let current = newFormData;

        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;

        return {
          formData: newFormData,
        };
      }),



    handleDocumentUpload: (path, file) => {
      if (file) {
        const isFront = path.includes("front");
        const staticPath = isFront
          ? "/uploads/id-front.jpg"
          : "/uploads/id-back.jpg";
        get().updateNestedFormData(path, staticPath);
      }
    },

    removeFile: (path) => {
      get().updateNestedFormData(path, null);
    },

    // Validation
    validateStep: (stepNumber) => {
      const state = get();
      const newErrors = {};

      switch (stepNumber) {
        case 1: {
          if (!state.formData.basicInfo.name?.trim())
            newErrors["basicInfo.name"] = "Name is required";
          if (!state.formData.basicInfo.email?.trim())
            newErrors["basicInfo.email"] = "Email is required";
          if (!state.formData.basicInfo.password?.trim())
            newErrors["basicInfo.password"] = "Password is required";
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (
            state.formData.basicInfo.email &&
            !emailRegex.test(state.formData.basicInfo.email)
          )
            newErrors["basicInfo.email"] = "Please enter a valid email address";
          // Password strength validation
          if (
            state.formData.basicInfo.password &&
            state.formData.basicInfo.password.length < 8
          )
            newErrors["basicInfo.password"] =
              "Password must be at least 8 characters long";
          break;
        }
        case 2: {
          if (!state.formData.personalInfo.phone?.trim())
            newErrors["personalInfo.phone"] = "Phone is required";
          if (!state.formData.personalInfo.age?.trim())
            newErrors["personalInfo.age"] = "Age is required";
          if (!state.formData.personalInfo.gender?.trim())
            newErrors["personalInfo.gender"] = "Gender is required";
          if (!state.formData.identification.nationalID?.trim())
            newErrors["identification.nationalID"] = "National ID is required";
          // Age validation
          const age = parseInt(state.formData.personalInfo.age);
          if (age && (age < 18 || age > 100))
            newErrors["personalInfo.age"] = "Age must be between 18 and 100";
          // Phone validation
          const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
          if (
            state.formData.personalInfo.phone &&
            !phoneRegex.test(
              state.formData.personalInfo.phone.replace(/\s/g, "")
            )
          )
            newErrors["personalInfo.phone"] =
              "Please enter a valid phone number";
          break;
        }
        default:
          break;
      }

      set({ errors: newErrors });
      return Object.keys(newErrors).length === 0;
    },

    validateAllSteps: () => {
      const state = get();
      let isValid = true;

      for (let step = 1; step <= 2; step++) {
        if (!state.validateStep(step)) {
          isValid = false;
        }
      }

      return isValid;
    },

    getFieldError: (path) => {
      const state = get();
      return state.errors[path];
    },

    clearErrors: () => set({ errors: {} }),

    resetForm: () =>
      set({
        formData: initialFormData,
        currentStep: 1,
        errors: {},
        isSubmitted: false,
      }),
    setLoading: (loading) => set({ isLoading: loading }),

    clearFormData: () => {
      sessionStorage.removeItem(STORAGE_KEY);
      set({ formData: initialFormData });
    },

    // Qualification management
    addQualification: (qualification) =>
      set((state) => ({
        formData: {
          ...state.formData,
          professionalInfo: {
            ...state.formData.professionalInfo,
            qualifications: [
              ...state.formData.professionalInfo.qualifications,
              qualification,
            ],
            tempQualification: {
              degree: "",
              institution: "",
              year: "",
              certificatePhoto: null,
            },
          },
        },
      })),

    removeQualification: (index) =>
      set((state) => {
        const updatedQualifications = [
          ...state.formData.professionalInfo.qualifications,
        ];
        updatedQualifications.splice(index, 1);
        return {
          formData: {
            ...state.formData,
            professionalInfo: {
              ...state.formData.professionalInfo,
              qualifications: updatedQualifications,
            },
          },
        };
      }),

    updateTempQualification: (data) =>
      set((state) => ({
        formData: {
          ...state.formData,
          professionalInfo: {
            ...state.formData.professionalInfo,
            tempQualification: {
              ...state.formData.professionalInfo.tempQualification,
              ...data,
            },
          },
        },
      })),

    handleSubmit: async (e) => {
      if (e) e.preventDefault();
      const state = get();
      set({
        isLoading: true,
      });

      try {
        // Transform form data to API format
        const apiData = transformFormDataForAPI(state.formData);
        
        console.log("Creating staff member with data (from the form store):", apiData);

        // Call the API
        const result = await createStaff(apiData);
        
        console.log("Staff member created successfully (from the form store):", result);
        
        // Show success toast
        toast.success("Staff member created successfully!", {
          description: "The new staff member has been added to the system.",
          duration: 4000,
        });
        
        // Clear form data after successful submission
        state.clearFormData();
        
        set({
          isSubmitted: true,
        });

        return { success: true, data: result };
      } catch (error) {
        console.error("Error creating staff member (from the store):", error);

        let errorTitle = "Failed to create staff member";
        let errorDescription = "An unexpected error occurred. Please try again.";

        if (error.response?.data?.details && Array.isArray(error.response.data.details)) {
          // Handle detailed validation errors from the backend
          errorTitle = error.response.data.message || "Validation Error";
          errorDescription = error.response.data.details
            .map(d => `- ${d.replace(/"/g, "")}`)
            .join('\n');
        } else if (error.response?.data?.message) {
          errorDescription = error.response.data.message;
        } else if (error.message) {
          errorDescription = error.message;
        } else if (typeof error === 'string') {
          errorDescription = error;
        }

        // Show error toast
        toast.error(errorTitle, {
          description: errorDescription,
          duration: 8000, // Increased duration for readability
          style: { whiteSpace: 'pre-line' }, // Ensure newlines are rendered
        });

        set({
          isLoading: false,
        });

        return { success: false, error: error };
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

// Subscribe to formData changes and save to sessionStorage
useStaffFormStore.subscribe(
  (state) => state.formData,
  (formData) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.warn("Failed to save form data to sessionStorage:", error);
    }
  }
);
