import React from 'react';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ICONS from './assets/icons';
import CustomDrawer from './components/core/CustomDrawer';
import useAppContext from './contexts/useAppContext';

const Drawer = createDrawerNavigator();
const Routes = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <>
      {!isLoggedIn ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              flex: 1,

              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            },
          }}
          drawerContent={() => {
            return <CustomDrawer />;
          }}>
          <Drawer.Screen
            name="Home"
            component={PrivateRoutes}
            options={{
              drawerIcon: ({color}) => <ICONS.Home size={22} color={color} />,
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      ) : (
        <PublicRoutes />
      )}
    </>
  );
};

export default Routes;
