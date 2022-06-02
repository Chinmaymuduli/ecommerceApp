import React, {useState, createContext, useEffect} from 'react';

type ContextType = {
  cartItems?: any;
  setCartItems?: any;
};

export const AppContext = createContext<ContextType>({});

const AppContextProvider: React.FC = ({children}) => {
  const [cartItems, setCartItems] = useState<any>([]);

  const value = {
    cartItems,
    setCartItems,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
