import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  Box,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {
  AYUSH_2,
  GOURMET2,
  GOURMET3,
  GOURMET5,
  NO_RESULT,
  PRODUCT_PLACEHOLDER,
  SEARCH_IMAGE,
} from 'assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {Empty, FetchLoader} from 'components/core';
import {useIsMounted, useSwrApi} from 'hooks';

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

// const Search = ({autoFocus}: TextInputProps) => {
const Search = () => {
  const navigation = useNavigation<NavigationProps>();
  const [search, setSearch] = React.useState<string>('');
  const isMounted = useIsMounted();
  const isFocused = useIsFocused();

  // console.log({search});
  // const inputRef = useRef<TextInput>(null);

  // useEffect(() => {
  //   console.log('goo', autoFocus);
  //   autoFocus &&
  //     setTimeout(() => {
  //       if (inputRef.current) {
  //         inputRef.current.focus();
  //       }
  //     }, 40);
  // }, []);

  const {data, isValidating, mutate} = useSwrApi(
    `products/search?searchText=${search}`,
  );
  const searchDataText = data?.data?.data?.data;
  useEffect(() => {
    mutate();
    isMounted.current && setSearch('');
  }, [isFocused]);

  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box px={4} py={3}>
        <Box borderWidth={1} borderColor={COLORS.lightGrey} borderRadius={5}>
          <Input
            placeholder="Search by name"
            variant={'unstyled'}
            value={search}
            onChangeText={text => setSearch(text)}
            fontSize={15}
            // ref={inputRef}
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
        {!search ? (
          <Box h={'full'} mt={150} bg={COLORS.textWhite}>
            <Image
              source={SEARCH_IMAGE}
              h={200}
              w={'full'}
              alt={'search_img'}
            />
          </Box>
        ) : (
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 130}}>
            {!isValidating ? (
              searchDataText?.length ? (
                <Box>
                  <Box mt={7}>
                    <Text color={COLORS.fadeBlack} fontSize={13} bold>
                      Searched Product
                    </Text>
                  </Box>
                  {/* {searchData?.map((item: searchArrType) => ( */}
                  {searchDataText?.map((item: any) => (
                    <Pressable
                      key={item?._id}
                      mt={4}
                      onPress={() =>
                        navigation.navigate('ProductDetails', {
                          ProductDetailsType: item,
                        })
                      }>
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
                            source={
                              item?.displayImage?.url
                                ? {uri: item?.displayImage?.url}
                                : PRODUCT_PLACEHOLDER
                            }
                            style={{height: 40, width: 40}}
                            resizeMode={'contain'}
                          />
                        </Box>
                        <Box>
                          <Text>{item?.title}</Text>
                        </Box>
                      </HStack>
                    </Pressable>
                  ))}
                </Box>
              ) : (
                <Empty animation={NO_RESULT} title="No result found" />
              )
            ) : (
              <ActivityIndicator
                size={'large'}
                style={{
                  marginTop: 25,
                }}
              />
            )}
          </ScrollView>
        )}
      </Box>
    </Box>
  );
};

export default Search;

const styles = StyleSheet.create({});
