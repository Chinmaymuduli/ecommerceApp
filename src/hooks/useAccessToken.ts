import create from 'zustand';

type AccessToken = {
    accessToken?: string;
    setAccessToken: (prev: string) => void;
};

const useAccessToken = create<AccessToken>(set => ({
    accessToken: '',
    setAccessToken: (token) => set(() => ({
        accessToken: token
    })),
}));

export default useAccessToken;
