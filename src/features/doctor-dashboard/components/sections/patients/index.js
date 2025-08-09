// Patient Management Components
export { default as PatientsOverview } from "./PatientsOverview";
export { default as CreatePatient } from "./CreatePatientRedirect";
export { default as PatientDetail } from "./PatientDetailRedirect";
export { default as PatientsTable } from "./PatientsTable";
export { default as CompactSearchFilter } from "./CompactSearchFilter";

// Export patient details components
export * from "./patient-details";

// Export create patient components
export * from "./create-patient";

// Keep backward compatibility
export { default as PatientsSection } from "./PatientsSection";
export { default as PatientProfile } from "./PatientProfile";

// Re-export PatientsOverview as the default
export { default } from "./PatientsOverview";
