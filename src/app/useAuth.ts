import { put } from 'api';
import { useAccessToken } from 'hooks';
import { User } from 'types';
import create from 'zustand';

type AuthState = {
    user?: Partial<User>;
    setUser: (user: Partial<User>) => Promise<void>;
    setUserData: (user: Partial<User>) => Promise<void>
    // logOut: () => Promise<void>;
    userData?: Partial<User>
    loggedIn?: boolean,

    setLoggedIn: (prev: boolean) => void
};

const useAuth = create<AuthState>(set => ({
    user: undefined,
    userData: undefined,
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
    setUserData: async (user_data: Partial<User>) => {
        set(state => ({
            ...state,
            user: { ...state?.user, ...user_data },
        }));
    },
}));

export default useAuth;
