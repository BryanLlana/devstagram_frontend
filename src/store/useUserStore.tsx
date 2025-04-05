import { create } from "zustand";
import { IUser } from "../modules/auth/services/login";

interface IUserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,
  setUser: (user: IUser | null) => {
    set({ user });
  },
}));
