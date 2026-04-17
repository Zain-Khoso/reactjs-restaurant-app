import { create } from 'zustand';

type SettingsStore = {
  deliveryFee: number;
  setDeliveryFee: (fee: number) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  deliveryFee: 150,
  setDeliveryFee: (fee) => set({ deliveryFee: fee }),
}));
