import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

const Routes = () => {
  // const [progress, setProgress] = React.useState(new Animated.Value(0));
  // const scale = Animated.interpolatedNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  // });

  // const borderRadius = Animated.interpolatedNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 26],
  // });

  // const animatedStyle = {borderRadius, transform: [{scale}]};
  return (
    <>
      <PrivateRoutes />
      {/* <PublicRoutes /> */}
      {/* <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: '#065934',
          drawerStyle: {
            flex: 1,
            width: '65%',
            paddingRight: 20,
            backgroundColor: '#065934',
          },
          sceneContainerStyle: {
            backgroundColor: '#065934',
          },
        }}
        initialRouteName="Home"
        drawerContent={() => {
          return <CustomDrawer />;
        }}>
        <Drawer.Screen
          name="DrawerScreen"
          component={PrivateRoutes}
          options={{
            drawerIcon: ({color}) => <ICONS.Home size={22} color={color} />,
            headerShown: false,
          }}
        />
      </Drawer.Navigator> */}
    </>
  );
};

export default Routes;
