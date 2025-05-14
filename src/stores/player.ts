import { create } from "zustand";

type PlayerStore = {
  position: { x: number; z: number };
  setPosition: (position: { x: number; z: number }) => void;
};

const usePlayerStore = create<PlayerStore>((set) => ({
  position: { x: 0, z: 0 },
  setPosition: (position: { x: number; z: number }) => set({ position }),
}));

export default usePlayerStore;
