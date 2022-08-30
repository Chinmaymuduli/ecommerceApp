import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {wishlist} from 'assets';

import HomeCategoryItem from './HomeCategoryItem';
import {ProductType} from 'types';
import {useIsMounted, useSwrApi} from 'hooks';

type CategoryProductType = {
  filteredData: ProductType[];
  setOpenAlert?: boolean | any;
  setAlertMessage?: string | any;
  businessType?: string;
  mutate: () => void;
  setSorting: (previous: string) => void;
  sorting?: string;
  filterRatting: any;
  filterPrice: any;
  isValidating: boolean;
  applyFilter: () => void;
};

const CategorySection = ({
  filteredData,
  setOpenAlert,
  setAlertMessage,
  businessType,
  mutate,
  isValidating,
  setSorting,
  sorting,
  filterPrice,
  filterRatting,
  applyFilter,
}: CategoryProductType) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {
    isOpen: filterSheetOpen,
    onOpen: filterOpen,
    onClose: filterClose,
  } = useDisclose();
  const isMounted = useIsMounted();
  const [categoryBanner, setCategoryBanner] = useState<any[]>();

  const {data} = useSwrApi(`banners?type=category`);

  useEffect(() => {
    isMounted.current && setCategoryBanner(data?.data?.data);
  }, [data]);

  return (
    <>
      <FlatList
        data={filteredData}
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
                {filteredData?.length} products
              </Text>
            </Box>
            {categoryBanner?.length && (
              <Box h={150} mt={2}>
                <Image
                  resizeMode="contain"
                  source={
                    categoryBanner?.length && {uri: categoryBanner[0]?.imageURL}
                  }
                  alt={'banner'}
                  style={{
                    width: '100%',
                    height: 150,
                  }}
                />
              </Box>
            )}
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
                onPress={filterOpen}>
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
                filterClose={filterClose}
                filterSheetOpen={filterSheetOpen}
                filterPrice={filterPrice}
                filterRatting={filterRatting}
                applyFilter={applyFilter}
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
