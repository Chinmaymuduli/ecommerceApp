import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext, useEffect} from 'react';

type ContextType = {
  cartItems?: any;
  setCartItems?: any;
  isLoggedIn?: boolean;
  setIsLoggedIn?: any;
  setUserData?: any;
  userData?: any;
  guestUser?: string;
  setGuestUser?: any;
};

export const AppContext = createContext<ContextType>({});

const AppContextProvider: React.FC = ({children}) => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<any>(null);
  const [guestUser, setGuestUser] = useState<any>('false');

  const [userData, setUserData] = useState({
    name: '',
    role: 'b2c',
    email: '',
    phone: '',
  });

  console.log('first', guestUser);

  useEffect(() => {
    (async () => {
      const agGuestData = await AsyncStorage.getItem('asGuest');
      setGuestUser(agGuestData);
    })();
  }, [isLoggedIn]);

  const value = {
    cartItems,
    setCartItems,
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    userData,
    guestUser,
    setGuestUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
