import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Image, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';

const HomeCategoriesItem = ({item}: any) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <Box pr={5} mt={4}>
      <Pressable
        alignItems={'center'}
        onPress={() => navigation.navigate('Category', item)}>
        <Box borderWidth={3} borderRadius={40} p={0.5} borderColor={'#4F7942'}>
          <Image
            source={item.img}
            style={styles.imagestyle}
            alt="categoryimg"
            resizeMode="contain"
          />
        </Box>
        <Text fontSize={13}>{item?.label}</Text>
      </Pressable>
    </Box>
  );
};

export default HomeCategoriesItem;

const styles = StyleSheet.create({
  imagestyle: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});
