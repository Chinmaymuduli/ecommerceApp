import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Actionsheet,
  Box,
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
import {Banner} from 'assets';

import HomeCategoryItem from './HomeCategoryItem';
import {ProductType} from 'types';

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
  isBusiness?: boolean;
};

const CategorySection = ({
  data,
  setOpenAlert,
  setAlertMessage,
  isBusiness: isBusiness,
}: CategoryProductType) => {
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  // console.log('Bussiness', isBusiness);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box pl={1}>
            <HomeCategoryItem
              item={item}
              setOpenAlert={setOpenAlert}
              setAlertMessage={setAlertMessage}
              isBusiness={isBusiness}
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
                      defaultValue="lowtohigh"
                      name="myRadioGroup"
                      // value={sortPrice}
                      // onChange={value => {
                      //   setSortPrice(value);
                      // }}
                      accessibilityLabel="Pick your sorting">
                      <Radio value="lowtohigh" my={3} colorScheme={'green'}>
                        Price (Low to high)
                      </Radio>
                      <Radio value="hightolow" my={3} colorScheme={'green'}>
                        Price (High to low)
                      </Radio>
                      <Radio value="latest" my={3} colorScheme={'green'}>
                        Newest
                      </Radio>
                      <Radio value="popularity" my={3} colorScheme={'green'}>
                        Popularity
                      </Radio>
                    </Radio.Group>
                    <HStack
                      mt={3}
                      w={'full'}
                      space={5}
                      //   bg={'red.100'}
                      justifyContent={'center'}>
                      <Pressable
                        onPress={onClose}
                        borderColor={COLORS.primary}
                        borderWidth={1}
                        borderRadius={5}>
                        <Text px={8} py={1} color={COLORS.primary} bold>
                          Cancel
                        </Text>
                      </Pressable>
                      <Pressable
                        // onPress={() => SortData()}
                        onPress={onClose}
                        bg={COLORS.primary}
                        borderRadius={5}
                        alignItems={'center'}>
                        <Text color={COLORS.textWhite} px={8} py={1} bold>
                          Apply
                        </Text>
                      </Pressable>
                    </HStack>
                  </Box>
                </Actionsheet.Content>
              </Actionsheet>
              {/* filter */}
              <FilterSheet
                setFilterSheet={setFilterSheetOpen}
                filterSheetOpen={filterSheetOpen}
              />
            </HStack>
          </Box>
        )}
        ListEmptyComponent={() => <Text>No Item Found</Text>}
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
});
