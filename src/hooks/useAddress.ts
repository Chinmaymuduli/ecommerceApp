
import create from 'zustand';

type AuthState = {
    addresses?: any;
    setAddresses: (notification: any) => Promise<void>;
};

const useAddress = create<AuthState>(set => ({
    addresses: undefined,

    setAddresses: async (address: any) => {
        set(state => ({
            ...state,
            addresses: { ...state?.addresses, ...address },
            // addresses : {addresses}
        }));
    },
}));

export default useAddress;