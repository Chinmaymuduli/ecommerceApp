import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Image, Input, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {AYUSH_2, GOURMEET2, GOURMEET3, GOURMEET5} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';

const searchArr = [
  {id: 1, label: 'chawanprash', img: GOURMEET5},
  {id: 2, label: 'Ragi Cookies', img: GOURMEET2},
  {id: 3, label: 'Aloe Vera Juice', img: GOURMEET3},
  {id: 4, label: 'Jyotismati Oil', img: AYUSH_2},
];

const Search = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box px={4} py={3}>
        <Box borderWidth={2} borderColor={COLORS.lightGrey} borderRadius={5}>
          <Input
            placeholder="Search by name"
            variant={'unstyled'}
            InputLeftElement={
              <Pressable pl={2}>
                <Ionicons name="arrow-back" size={24} color={'#000'} />
              </Pressable>
            }
          />
        </Box>
        <Box mt={7}>
          <Text color={COLORS.fadeBlack} fontSize={13} bold>
            Tranding Product
          </Text>
        </Box>
        {searchArr?.map((item: any) => (
          <Pressable
            key={item.id}
            mt={4}
            onPress={() => navigation.navigate('Category')}>
            <HStack alignItems={'center'} space={4}>
              <Box
                borderRadius={10}
                bg={'#e4e4e460'}
                h={45}
                w={45}
                alignItems={'center'}
                justifyContent={'center'}>
                <Image
                  alt="searchImg"
                  source={item.img}
                  style={{height: 40, width: 40}}
                  resizeMode={'contain'}
                />
              </Box>
              <Box>
                <Text>{item?.label}</Text>
              </Box>
            </HStack>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
};

export default Search;

const styles = StyleSheet.create({});
