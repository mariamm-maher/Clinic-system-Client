import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Days of the week
export const DAYS_OF_WEEK = [
  { value: "sunday", label: "Sunday", short: "Sun" },
  { value: "monday", label: "Monday", short: "Mon" },
  { value: "tuesday", label: "Tuesday", short: "Tue" },
  { value: "wednesday", label: "Wednesday", short: "Wed" },
  { value: "thursday", label: "Thursday", short: "Thu" },
  { value: "friday", label: "Friday", short: "Fri" },
  { value: "saturday", label: "Saturday", short: "Sat" },
];

// Generate time slots from 6:00 AM to 10:00 PM in 30-minute intervals
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
    }
  }
  return slots;
};

export const TIME_SLOTS = generateTimeSlots();

// Initial schedule data
const initialScheduleData = [
  {
    id: 1,
    day: "monday",
    startTime: "08:00",
    endTime: "12:00",
    isAvailable: true,
    notes: "Morning clinic",
  },
  {
    id: 2,
    day: "monday",
    startTime: "14:00",
    endTime: "18:00",
    isAvailable: true,
    notes: "Afternoon clinic",
  },
  {
    id: 3,
    day: "tuesday",
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
    notes: "Full day clinic",
  },
  {
    id: 4,
    day: "wednesday",
    startTime: "08:00",
    endTime: "12:00",
    isAvailable: false,
    notes: "Conference day - unavailable",
  },
  {
    id: 5,
    day: "thursday",
    startTime: "08:00",
    endTime: "16:00",
    isAvailable: true,
    notes: "Surgery day",
  },
  {
    id: 6,
    day: "friday",
    startTime: "08:00",
    endTime: "14:00",
    isAvailable: true,
    notes: "Half day clinic",
  },
];

export const useScheduleStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    scheduleData: initialScheduleData,
    isLoading: false,

    // Actions
    addTimeSlot: (timeSlot) => {
      const newSlot = {
        id: Date.now(),
        ...timeSlot,
      };
      set((state) => ({
        scheduleData: [...state.scheduleData, newSlot],
      }));
    },

    updateTimeSlot: (id, updates) => {
      set((state) => ({
        scheduleData: state.scheduleData.map((slot) =>
          slot.id === id ? { ...slot, ...updates } : slot
        ),
      }));
    },

    deleteTimeSlot: (id) => {
      set((state) => ({
        scheduleData: state.scheduleData.filter((slot) => slot.id !== id),
      }));
    },

    getScheduleByDay: (day) => {
      const { scheduleData } = get();
      return scheduleData.filter((slot) => slot.day === day);
    },

    // Get schedule statistics
    getScheduleStats: () => {
      const { scheduleData } = get();
      return {
        totalSlots: scheduleData.length,
        availableSlots: scheduleData.filter((slot) => slot.isAvailable).length,
        unavailableSlots: scheduleData.filter((slot) => !slot.isAvailable).length,
        activeDays: new Set(scheduleData.map((slot) => slot.day)).size,
      };
    },

    // Set loading state
    setLoading: (loading) => set({ isLoading: loading }),

    // Reset schedule data
    resetSchedule: () => set({ scheduleData: initialScheduleData }),
  }))
);
