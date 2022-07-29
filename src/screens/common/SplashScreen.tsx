import {useNavigation} from '@react-navigation/core';
import {LOGO} from 'assets';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  View,
  SafeAreaView,
  StatusBar,
  Easing,
  StyleSheet,
} from 'react-native';
import {PublicNavigation} from 'src/routes/PublicRoutes';

export default function SplashScreen() {
  const navigation = useNavigation<PublicNavigation>();

  const translation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(translation, {
      toValue: -150,
      delay: 400,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.ease,
    }).start(() => {});
  }, [translation]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageWrapper}>
        <Animated.Image
          source={LOGO}
          style={{
            ...styles.imageStyle,
            transform: [
              {
                translateY: translation,
              },
            ],
            opacity: translation.interpolate({
              inputRange: [-150, 0],
              outputRange: [1, 0],
            }),
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
