import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'types';
import create from 'zustand';

type AuthState = {
    user?: Partial<User>;
    setUser: (user: Partial<User>) => Promise<void>;
};

const useAuth = create<AuthState>(set => ({
    user: undefined,
    setUser: async (user: Partial<User>) => {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem('user', jsonValue)
        set(state => ({
            ...state,
            user: { ...state?.user, ...user },
        }));
    }
}));

export default useAuth;
