import { create } from 'zustand';

export interface SelectedProperty {
  id: string;
  name: string;
  code: string;
}

interface PropertyStore {
  selectedProperty: SelectedProperty | null;
  setSelectedProperty: (property: SelectedProperty | null) => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  selectedProperty: null,
  setSelectedProperty: (selectedProperty) => set({ selectedProperty }),
}));
