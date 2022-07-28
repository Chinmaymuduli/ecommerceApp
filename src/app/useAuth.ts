import AsyncStorage from '@react-native-async-storage/async-storage';
import { put } from 'api';
import { useAccessToken } from 'hooks';
import { User } from 'types';
import create from 'zustand';

type AuthState = {
    user?: Partial<User>;
    setUser: (user: Partial<User>) => Promise<void>;
    logOut: () => Promise<void>;
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
    logOut: async () => {
        try {
            set(state => ({ ...state, isAuthenticated: false, user: {} }));
            const token = await AsyncStorage.getItem('access_token')
            const logoutRes = await fetch('https://chhattisgarh-herbals-api.herokuapp.com/api/auth/logout', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const response = await logoutRes.json()
            if (response.status === 200) {
                await AsyncStorage.removeItem('access_token')
            }
        } catch (error) {
            console.log(error);
        }
    },


}));

export default useAuth;
