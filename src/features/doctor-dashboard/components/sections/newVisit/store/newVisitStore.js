import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// No step constants needed for tab-based navigation
const STORAGE_KEY = "newVisitFormData";

// Initial form data structure based on medical requirements
const initialFormData = {
  // Basic Visit Info
  basicInfo: {
    patientId: "",
    visitType: "", // consultation, follow-up
    date: new Date().toISOString().split('T')[0], // Default to today
  },
  
  // Past History
  pastHistory: {
    medicalHistory: "",
    medications: "",
    surgicalHistory: "",
    hospitalizations: "",
    allergies: "",
  },
  
  // Main Complaint
  mainComplaint: {
    description: "",
    onset: "",
    duration: "",
    location: "",
    character: "",
    course: "",
    severity: "",
    radiation: "",
    associatedSymptoms: "",
    aggravatingFactors: "",
    relievingFactors: "",
    previousEpisodes: "",
    impactOnLife: "",
    patientThoughts: "",
    otherNotes: "",
  },
  
  // Checks (all checkboxes)
  checks: {
    general: {
      fever: false,
      weightLoss: false,
      fatigue: false,
      nightSweats: false,
      appetiteChange: false,
      weakness: false,
    },
    cardiovascular: {
      chestPain: false,
      palpitations: false,
      shortnessOfBreath: false,
      orthopnea: false,
      paroxysmalNocturnalDyspnea: false,
      legSwelling: false,
    },
    respiratory: {
      cough: false,
      sputum: false,
      hemoptysis: false,
      wheezing: false,
      shortnessOfBreath: false,
      chestTightness: false,
    },
    gastrointestinal: {
      nausea: false,
      vomiting: false,
      diarrhea: false,
      constipation: false,
      abdominalPain: false,
      bloating: false,
      heartburn: false,
      difficultySwallowing: false,
      rectalBleeding: false,
    },
    genitourinary: {
      dysuria: false,
      urinaryFrequency: false,
      urgency: false,
      incontinence: false,
      hematuria: false,
      flankPain: false,
    },
    reproductive: {
      menstrualIrregularities: false,
      pelvicPain: false,
      vaginalDischarge: false,
      erectileDysfunction: false,
      libidoChanges: false,
    },
    musculoskeletal: {
      jointPain: false,
      jointSwelling: false,
      backPain: false,
      muscleCramps: false,
      stiffness: false,
      limitedMobility: false,
    },
    neurological: {
      headache: false,
      dizziness: false,
      syncope: false,
      seizures: false,
      numbness: false,
      tingling: false,
      weakness: false,
      tremors: false,
      memoryIssues: false,
    },
    endocrine: {
      heatIntolerance: false,
      coldIntolerance: false,
      excessiveThirst: false,
      excessiveUrination: false,
      weightGain: false,
      weightLoss: false,
      hairLoss: false,
    },
    dermatological: {
      rashes: false,
      itching: false,
      dryness: false,
      hairLoss: false,
      skinColorChanges: false,
      lesions: false,
    },
    psychiatric: {
      anxiety: false,
      depression: false,
      insomnia: false,
      moodSwings: false,
      hallucinations: false,
      suicidalThoughts: false,
    },
    hematological: {
      easyBruising: false,
      prolongedBleeding: false,
      anemiaSymptoms: false,
    },
    allergyImmunology: {
      nasalCongestion: false,
      sneezing: false,
      seasonalAllergies: false,
      foodAllergies: false,
      drugAllergies: false,
    },
    otherNotes: "",
  },
  
  // Examination
  examination: {
    generalLook: "",
    build: "", // normal, thin, obese, cachectic, muscular
    levelOfConsciousness: "", // alert, drowsy, stuporous, unconscious
    orientation: {
      time: false,
      person: false,
      place: false,
    },
    attachment: "",
    pallor: false,
    cyanosis: false,
    jaundice: false,
    clubbing: false,
    edema: false,
    lymphadenopathy: false,
    dehydration: false,
    weight: "",
    height: "",
    bmi: "", // Auto-calculated
    bloodPressure: {
      systolic: "",
      diastolic: "",
    },
    heartRate: "",
    respiratoryRate: "",
    temperature: "",
    oxygenSaturation: "",
    randomBloodSugar: "",
    systemicExamination: [],
    otherFindings: "",
  },
  
  // Investigations
  investigations: {
    labs: [],
    imaging: [],
    biopsy: [],
  },
  
  // Prescription
  prescription: {
    lifestyle: "",
    medications: [],
    orderedInvestigations: [],
    referrals: [],
    followUp: {
      date: "",
      notes: "",
    },
  },
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
    console.warn("Failed to load visit form data from sessionStorage:", error);
  }
  return initialFormData;
};

export const useNewVisitStore = create(
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

    // No validation needed - doctors can fill forms freely

    clearErrors: () => set({ errors: {} }),

    resetForm: () =>
      set({
        formData: initialFormData,
        errors: {},
        isSubmitted: false,
      }),

    setLoading: (loading) => set({ isLoading: loading }),

    clearFormData: () => {
      sessionStorage.removeItem(STORAGE_KEY);
      set({ formData: initialFormData });
    },

    // Array management functions
    addToArray: (section, field, item) =>
      set((state) => ({
        formData: {
          ...state.formData,
          [section]: {
            ...state.formData[section],
            [field]: [...state.formData[section][field], item],
          },
        },
      })),

    removeFromArray: (section, field, index) =>
      set((state) => {
        const updatedArray = [...state.formData[section][field]];
        updatedArray.splice(index, 1);
        return {
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              [field]: updatedArray,
            },
          },
        };
      }),

    updateArrayItem: (section, field, index, data) =>
      set((state) => {
        const updatedArray = [...state.formData[section][field]];
        updatedArray[index] = { ...updatedArray[index], ...data };
        return {
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              [field]: updatedArray,
            },
          },
        };
      }),

    // BMI calculation
    calculateBMI: () =>
      set((state) => {
        const weight = parseFloat(state.formData.examination.weight);
        const height = parseFloat(state.formData.examination.height) / 100; // Convert cm to m
        
        if (weight && height) {
          const bmi = (weight / (height * height)).toFixed(1);
          return {
            formData: {
              ...state.formData,
              examination: {
                ...state.formData.examination,
                bmi: bmi,
              },
            },
          };
        }
        return state;
      }),

    // Submit handler
    handleSubmit: async (e) => {
      if (e) e.preventDefault();
      const state = get();

      // Validate all steps before submission
      if (!state.validateAllSteps()) {
        return false;
      }

      set({
        isLoading: true,
      });

      try {
        // Prepare form data for API submission
        const formDataToSubmit = {
          ...state.formData,
          submittedAt: new Date().toISOString(),
        };

        // Simulate API call - replace with actual API endpoint
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate random success/failure for testing
            if (Math.random() > 0.1) { // 90% success rate
              resolve();
            } else {
              reject(new Error("Network error occurred"));
            }
          }, 2000);
        });

        console.log("Creating new visit:", formDataToSubmit);

        // Clear form data on successful submission
        state.clearFormData();

        set({
          isSubmitted: true,
        });

        // Reset form after successful submission
        setTimeout(() => {
          state.resetForm();
        }, 100);
        
        return true;
      } catch (error) {
        console.error("Error creating visit:", error);
        return false;
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

// Subscribe to formData changes and save to sessionStorage
useNewVisitStore.subscribe(
  (state) => state.formData,
  (formData) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.warn("Failed to save visit form data to sessionStorage:", error);
    }
  }
);
