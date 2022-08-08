import {User} from 'types';
import create from 'zustand';

type AuthState = {
  user?: Partial<User>;
  setUser: (user: Partial<User>) => Promise<void>;
  loggedIn?: boolean;
  setLoggedIn: (prev: boolean) => void;
  // userType?: string;
  // setUserType: (prev: string) => void;
};

const useAuth = create<AuthState>(set => ({
  user: undefined,
  loggedIn: false,
  // userType: 'b2c',
  setLoggedIn: bool =>
    set(() => ({
      loggedIn: bool,
    })),
  setUser: async (user: Partial<User>) => {
    set(state => ({
      ...state,
      user: {...state?.user, ...user},
    }));
  },

  // setUserType: type =>
  //   set(() => ({
  //     userType: type,
  //   })),
}));

export default useAuth;
