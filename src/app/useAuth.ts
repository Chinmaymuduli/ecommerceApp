import AsyncStorage from '@react-native-async-storage/async-storage';
import { put } from 'api';
import { User } from 'types';
import create from 'zustand';

type AuthState = {
    user?: Partial<User>;
    setUser: (user: Partial<User>) => Promise<void>;
    loggedIn?: boolean,

    setLoggedIn: (prev: boolean) => void
};

const useAuth = create<AuthState>(set => ({
    user: undefined,
    loggedIn: false,
    setLoggedIn: (bool) => set(() => ({
        loggedIn: bool
    })),
    setUser: async (user: Partial<User>) => {
        set(state => ({
            ...state,
            user: { ...state?.user, ...user },
        }));
    },


}));

export default useAuth;
