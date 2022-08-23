import {ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {
  Actionsheet,
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  Pressable,
  Radio,
  Text,
  useDisclose,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterSheet from './FilterSheet';
import {Banner, wishlist} from 'assets';

import HomeCategoryItem from './HomeCategoryItem';
import {ProductType} from 'types';
import {FetchLoader, SkeletonComponent} from './core';

type CategoryProductType = {
  // data: {
  //   id?: number;
  //   name?: string;
  //   discount?: number;
  //   img?: any;
  //   currentPrice?: number;
  //   offer?: string;
  // }[];
  data: ProductType[];
  setOpenAlert?: boolean | any;
  setAlertMessage?: string | any;
  businessType?: string;
  mutate: () => void;
  setSorting: (previous: string) => void;
  sorting?: string;
  setFilterPrice: (data: string) => void;
  setFilterRatting: (data: string) => void;
  filterRatting: string | any;
  filterPrice: string | any;
  isValidating: boolean;
};

const CategorySection = ({
  data,
  setOpenAlert,
  setAlertMessage,
  businessType,
  mutate,
  isValidating,
  setSorting,
  sorting,
  filterPrice,
  filterRatting,
  setFilterRatting,
  setFilterPrice,
}: CategoryProductType) => {
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <>
      <FlatList
        data={data}
        onRefresh={() => mutate()}
        refreshing={isValidating}
        renderItem={({item}) => (
          <Box pl={1}>
            <HomeCategoryItem
              item={item}
              setOpenAlert={setOpenAlert}
              setAlertMessage={setAlertMessage}
              businessType={businessType}
              ProductMutate={mutate}
              isValidating={isValidating}
            />
          </Box>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 200}}
        ListHeaderComponent={() => (
          <Box py={1} w={'270'}>
            <Box px={3}>
              <Text fontSize={15} py={2}>
                {data?.length} products
              </Text>
            </Box>
            <Box h={150} mt={2}>
              <Image
                resizeMode="contain"
                source={Banner}
                alt={'banner'}
                style={{
                  width: '100%',
                  height: 150,
                }}
              />
            </Box>
            <HStack position={'absolute'} right={0} top={3} space={3}>
              <Pressable
                bg={COLORS.textWhite}
                shadow={2}
                borderRadius={5}
                onPress={onOpen}>
                <MaterialCommunityIcons
                  name="sort"
                  size={20}
                  color={COLORS.fadeBlack}
                  style={{
                    padding: 5,
                  }}
                />
              </Pressable>
              <Pressable
                bg={COLORS.textWhite}
                shadow={2}
                borderRadius={5}
                onPress={() => {
                  setFilterSheetOpen(true);
                }}>
                <AntDesign
                  name="filter"
                  size={20}
                  color={COLORS.fadeBlack}
                  style={{
                    padding: 5,
                  }}
                />
              </Pressable>
              {/* Sort Actionshett */}
              <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
                <Actionsheet.Content borderTopRadius="0">
                  <Box w={'100%'}>
                    <HStack
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      borderBottomWidth={1}
                      borderColor={COLORS.lightGrey}>
                      <Heading py={2}>Sort</Heading>
                      <Ionicons
                        name="ios-close"
                        size={30}
                        color={COLORS.fadeBlack}
                        onPress={onClose}
                      />
                    </HStack>
                    <Radio.Group
                      defaultValue="default"
                      name="myRadioGroup"
                      value={sorting}
                      onChange={value => {
                        setSorting(value), onClose();
                      }}
                      accessibilityLabel="Pick your sorting">
                      <Radio value="low-to-high" my={3} colorScheme={'green'}>
                        Price (Low to high)
                      </Radio>
                      <Radio value="high-to-low" my={3} colorScheme={'green'}>
                        Price (High to low)
                      </Radio>
                      <Radio value="latest" my={3} colorScheme={'green'}>
                        Newest
                      </Radio>
                      <Radio value="popularity" my={3} colorScheme={'green'}>
                        Popularity
                      </Radio>
                      <Radio value="default" my={3} colorScheme={'green'}>
                        Default
                      </Radio>
                    </Radio.Group>
                  </Box>
                </Actionsheet.Content>
              </Actionsheet>
              {/* filter */}
              <FilterSheet
                setFilterSheet={setFilterSheetOpen}
                filterSheetOpen={filterSheetOpen}
                setFilterPrice={setFilterPrice}
                setFilterRatting={setFilterRatting}
                filterPrice={filterPrice}
                filterRatting={filterRatting}
              />
            </HStack>
          </Box>
        )}
        ListEmptyComponent={() => (
          <>
            {!isValidating ? (
              <Center h={350} w={'full'}>
                <Image
                  source={wishlist}
                  style={styles.wishList_image}
                  alt={'wishlist image'}
                />
                <Text bold color={'black'} fontSize={18} mt={10}>
                  No Products Found
                </Text>
              </Center>
            ) : (
              <Box justifyContent={'center'} alignItems={'center'}>
                <ActivityIndicator size={'large'} />
              </Box>
            )}
          </>
        )}
      />
    </>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
  wishList_image: {
    width: 150,
    height: 150,
  },
});
