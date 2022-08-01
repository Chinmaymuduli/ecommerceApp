import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Box, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';

type Props = {
  item: {
    id: number;
    name: string;
    img: any;
    offer: string;
  };
};

const HomeSliderCards = ({item}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <>
      <Pressable mt={5} onPress={() => navigation.navigate('Category', {})}>
        <ImageBackground
          borderRadius={10}
          source={item.img}
          style={{
            height: 150,
            width: 300,
            marginHorizontal: 10,
          }}>
          <Box ml={150} mt={5}>
            <Text color={COLORS.textWhite} fontSize={12} bold>
              {item?.name}
            </Text>
            <Text bold color={COLORS.textWhite} flexWrap={'wrap'} mt={1}>
              {item?.offer}
            </Text>
            <Box
              mt={2}
              bg={COLORS.textWhite}
              borderRadius={5}
              alignItems={'center'}
              w={'2/3'}>
              <Text color={COLORS.primary} bold py={1}>
                Shop Now
              </Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </>
  );
};

export default HomeSliderCards;

const styles = StyleSheet.create({});
