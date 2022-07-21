import { put } from 'api';
import { useAccessToken } from 'hooks';
import { User } from 'types';
import create from 'zustand';

type AuthState = {
    user?: Partial<User>;
    setUser: (user: Partial<User>) => Promise<void>;
    // logOut: () => Promise<void>;
};

const useAuth = create<AuthState>(set => ({
    user: undefined,
    setUser: async (user: Partial<User>) => {
        // const jsonValue = JSON.stringify(user)
        // await AsyncStorage.setItem('user', jsonValue)
        set(state => ({
            ...state,
            user: { ...state?.user, ...user },
        }));
    },
    // logOut: async () => {
    //     const { accessToken } = useAccessToken()
    //     try {
    //         set(state => ({ ...state, user: {} }));
    //         await put({
    //             path: 'auth/logout',
    //             token: accessToken,
    //         });;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
}));

export default useAuth;
