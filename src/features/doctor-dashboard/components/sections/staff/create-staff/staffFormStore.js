import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Constants
export const TOTAL_STEPS = 4;
const STORAGE_KEY = "staffFormData";

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
      zipCode: "",
      country: "Egypt",
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

    // File handling actions
    handleAvatarUpload: (file) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          get().updateFormData("basicInfo", {
            avatar: file,
            avatarPreview: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    },

    handleDocumentUpload: (path, file) => {
      if (file) {
        get().updateNestedFormData(path, file);
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

      // Validate all steps before submission
      // if (!state.validateAllSteps()) {
      //   return false;
      // }

      set({
        isLoading: true,
      });

      try {
        // Prepare form data for API submission
        const formDataToSubmit = {
          ...state.formData,
          // Add any additional processing here
          submittedAt: new Date().toISOString(),
        };
        console.log("Creating staff member:", formDataToSubmit);

        return true;
      } catch (error) {
        console.error("Error creating staff member:", error);
        return false;
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
