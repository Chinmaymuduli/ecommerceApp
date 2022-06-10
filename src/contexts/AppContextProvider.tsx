import React, {useState, createContext, useEffect} from 'react';

type ContextType = {
  cartItems?: any;
  setCartItems?: any;
  isLoggedIn?: boolean;
  setIsLoggedIn?: any;
};

export const AppContext = createContext<ContextType>({});

const AppContextProvider: React.FC = ({children}) => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    cartItems,
    setCartItems,
    isLoggedIn,
    setIsLoggedIn,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
