import { create } from "zustand";

type GameStore = {
  score: number;
  gameOver: boolean;
  setScore: (score: number) => void;
  setGameOver: (gameOver: boolean) => void;
};

const useGameStore = create<GameStore>((set) => ({
  score: 0,
  gameOver: false,
  setScore: (score) => set(() => ({ score })),
  setGameOver: (gameOver: boolean) => set(() => ({ gameOver })),
}));

export default useGameStore;
