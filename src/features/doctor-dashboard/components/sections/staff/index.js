// Staff Management Components
export { default as StaffOverview } from "./StaffOverview";
export { default as CreateStaff } from "./CreateStaffRedirect"; // Using simplified form with required fields only
export { default as StaffDetail } from "./StaffDetailRedirect";
export { default as StaffTable } from "./StaffTable";

// Export staff details components
export * from "./staff-details";

// Keep backward compatibility
export { default as StaffSection } from "./StaffSection";

// Re-export StaffOverview as the default
export { default } from "./StaffOverview";
