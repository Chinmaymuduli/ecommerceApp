import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Box, HStack, Image, Input, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {AYUSH_2, GOURMET2, GOURMET3, GOURMET5, NO_RESULT} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {Empty} from 'components/core';

const searchArr = [
  {id: 1, label: 'chawanprash', img: GOURMET5},
  {id: 2, label: 'Ragi Cookies', img: GOURMET2},
  {id: 3, label: 'Aloe Vera Juice', img: GOURMET3},
  {id: 4, label: 'Jyotismati Oil', img: AYUSH_2},
  {id: 5, label: 'Mahua Laddu', img: GOURMET2},
  {id: 6, label: 'Jyotismati Oil', img: GOURMET5},
];

type searchArrType = {
  id: number;
  label: string;
  img: string | any;
};

const Search = () => {
  const navigation = useNavigation<NavigationProps>();
  const [search, setSearch] = React.useState<string>('');
  const [searchData, setSearchData] = React.useState<any[]>([]);

  useEffect(() => {
    if (!search.trim()) {
      setSearchData(searchArr.slice(0, 3));
      return;
    }
    const searching = searchArr.filter((item: searchArrType) =>
      item?.label?.toLowerCase().includes(search?.toLowerCase()),
    );
    setSearchData(searching);
  }, [search]);

  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box px={4} py={3}>
        <Box borderWidth={2} borderColor={COLORS.lightGrey} borderRadius={5}>
          <Input
            placeholder="Search by name"
            variant={'unstyled'}
            value={search}
            onChangeText={text => setSearch(text)}
            InputLeftElement={
              <Pressable pl={2}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={'#000'}
                  onPress={() => navigation.goBack()}
                />
              </Pressable>
            }
          />
        </Box>
        {searchData?.length ? (
          <Box>
            <Box mt={7}>
              <Text color={COLORS.fadeBlack} fontSize={13} bold>
                Trading Product
              </Text>
            </Box>
            {searchData?.map((item: searchArrType) => (
              <Pressable
                key={item.id}
                mt={4}
                onPress={() => navigation.navigate('Category', {})}>
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
        ) : (
          <Empty animation={NO_RESULT} title="No result found" />
        )}
      </Box>
    </Box>
  );
};

export default Search;

const styles = StyleSheet.create({});
