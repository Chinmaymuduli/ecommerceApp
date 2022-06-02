import {StyleSheet} from 'react-native';
import React, {useRef} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterSheet from './FilterSheet';
import {Banner} from 'assets';
import Animatable from 'react-native-animatable';
import AllProduct from './AllProduct';

const AyushProduct = ({data}: any) => {
  const navigation = useNavigation<NavigationProps>();
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [sortPrice, setSortPrice] = React.useState<any>();
  const [sortData, setSortData] = React.useState<any>([]);

  const renderItem = ({item, index}: any) => {
    return <AllProduct item={item} />;
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 200}}
        ListHeaderComponent={() => (
          <Box py={1}>
            <Box px={3}>
              <Text fontSize={15} py={2}>
                {data.length} products
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
                        borderColor={COLORS.cgcolor}
                        borderWidth={1}
                        borderRadius={5}>
                        <Text px={8} py={1} color={COLORS.cgcolor} bold>
                          Cancel
                        </Text>
                      </Pressable>
                      <Pressable
                        // onPress={() => SortData()}
                        onPress={onClose}
                        bg={COLORS.cgcolor}
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
      />
    </>
  );
};

export default AyushProduct;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
});
