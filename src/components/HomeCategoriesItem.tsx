import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Image, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {CategoryType} from 'types';
import {COLORS} from 'configs';
import {CategorySkeleton} from '../../src/skeleton';

const HomeCategoriesItem = ({
  item,
  isLoading,
}: {
  item: CategoryType;
  isLoading: boolean;
}) => {
  const navigation = useNavigation<NavigationProps>();
  // console.log({isLoading});

  return (
    <>
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <Box pr={5} mt={4}>
          <Pressable
            alignItems={'center'}
            onPress={() => navigation.navigate('Category', item)}>
            <Box
              borderWidth={3}
              borderRadius={40}
              p={0.5}
              borderColor={COLORS.secondary}>
              <Image
                source={{
                  uri: item?.imageURL
                    ? item?.imageURL
                    : 'https://media.istockphoto.com/photos/collection-of-fresh-herbs-picture-id183808249?k=20&m=183808249&s=612x612&w=0&h=rLWcKD1D3FOG7C9tJ98DMzLOpfYA-WDkQC8sqeofvVY=',
                }}
                style={styles.image_style}
                alt="category_img"
                resizeMode="contain"
              />
            </Box>
            <Text fontSize={13}>{item?.name}</Text>
          </Pressable>
        </Box>
      )}
    </>
  );
};

export default HomeCategoriesItem;

const styles = StyleSheet.create({
  image_style: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});
