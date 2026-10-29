import { create } from 'zustand';

/**
 * Global booking state — tracks which package the user picked from the
 * pricing table and whether the booking modal is open. Kept minimal:
 * the modal owns its own form state internally.
 */
export const useBookingStore = create((set) => ({
  isModalOpen: false,
  selectedPackage: null, // 'BASIC' | 'PRO' | 'EXTREME'
  lastBookingId: null,

  openBookingModal: (pkg) => set({ isModalOpen: true, selectedPackage: pkg }),
  closeBookingModal: () => set({ isModalOpen: false, selectedPackage: null }),
  setLastBookingId: (id) => set({ lastBookingId: id }),
}));
