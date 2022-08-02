
import create from 'zustand';

type AuthState = {
  notifications?: any;
  setNotifications: (notification: any) => Promise<void>;
};

const useNotifications = create<AuthState>(set => ({
  notifications: undefined,

  setNotifications: async (notification: any) => {
    set(state => ({
      ...state,
      notifications: { ...state?.notifications, ...notification },
    }));
  },
}));

export default useNotifications;
