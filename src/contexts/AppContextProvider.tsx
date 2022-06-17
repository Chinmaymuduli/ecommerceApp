import React, {useState, createContext, useEffect} from 'react';

type ContextType = {
  cartItems?: any;
  setCartItems?: any;
  isLoggedIn?: boolean;
  setIsLoggedIn?: any;
  setUserData?: any;
  userData?: any;
};

export const AppContext = createContext<ContextType>({});

const AppContextProvider: React.FC = ({children}) => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    role: 'b2c',
    email: '',
    phone: '',
  });

  const value = {
    cartItems,
    setCartItems,
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    userData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
