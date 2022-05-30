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

const AyushProduct = ({data}: any) => {
  const viewRef = useRef(null);
  const navigation = useNavigation<NavigationProps>();
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [count, setCount] = React.useState(0);
  const [categoryAddtocart, setCategoryAddtocart] = React.useState<any>([]);
  console.log('object', categoryAddtocart);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };
  const AddToCartCategory = (item: any) => {
    increment();
    setCategoryAddtocart((prev: any) => [...prev, item]);
  };
  const renderItem = ({item, index}: any) => {
    return (
      //   <Animatable.View animation="fadeInUp" duration={1000} delay={index * 300}>
      <Box mt={2} overflow={'hidden'} mb={4} px={1}>
        <Pressable onPress={() => navigation.navigate('ProductDetails')}>
          <Box
            h={120}
            w={120}
            borderWidth={1}
            mr={2}
            alignItems={'center'}
            borderColor={COLORS.lightGrey}
            borderRadius={5}>
            <Image
              alt="image"
              source={item?.img}
              style={styles.image}
              resizeMode={'contain'}
            />
          </Box>
          <Box
            width={8}
            position={'absolute'}
            bg={'#4F7942'}
            borderTopLeftRadius={5}
            borderBottomRightRadius={5}>
            <Text
              fontSize={10}
              flexWrap={'wrap'}
              px={1}
              color={COLORS.textWhite}>
              {item?.offer}
            </Text>
          </Box>
          <Box
            // mt={1}
            position={'absolute'}
            right={4}
            borderRadius={10}>
            <Ionicons
              onPress={() => console.log('hello')}
              name="heart-outline"
              size={22}
              color={COLORS.cgcolor}
              style={{
                paddingHorizontal: 2,
                paddingVertical: 2,
              }}
            />
          </Box>
          <Box
            alignSelf={'flex-end'}
            right={2}
            bg={COLORS.textWhite}
            mt={-5}
            shadow={1}
            // borderWidth={1}
            borderRadius={5}
            borderColor={COLORS.lightGrey}>
            {categoryAddtocart?.some((data: any) => data?.id === item?.id) &&
            count > 0 ? (
              <HStack
                bg={'#FFFF0060'}
                w={'120'}
                justifyContent="space-between"
                alignItems={'center'}>
                <Box>
                  <Entypo
                    name="minus"
                    size={20}
                    color={COLORS.fadeBlack}
                    onPress={() => decrement()}
                  />
                </Box>
                <Box>
                  <Text>{count}</Text>
                </Box>
                <Box>
                  <Entypo
                    name="plus"
                    size={18}
                    color={COLORS.fadeBlack}
                    style={{
                      paddingHorizontal: 3,
                      paddingVertical: 3,
                    }}
                    onPress={() => setCount(count + 1)}
                  />
                </Box>
              </HStack>
            ) : (
              <Entypo
                name="plus"
                size={18}
                color={COLORS.fadeBlack}
                style={{
                  paddingHorizontal: 3,
                  paddingVertical: 3,
                }}
                onPress={() => AddToCartCategory(item)}
              />
            )}
          </Box>
          <Box w={120}>
            <Text bold fontSize={12} numberOfLines={1}>
              {item?.label}
            </Text>
            <HStack space={2}>
              <Text fontSize={13}>&#8377;{item?.price}</Text>
              <Text fontSize={13} textDecorationLine={'line-through'}>
                &#8377;{item?.discount}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
      //   </Animatable.View>
    );
  };
  return (
    <>
      {/* <Animatable.View
        ref={viewRef}
        easing={'ease-in-out'}
        duration={500}
        // style={Styles.container}
      > */}
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
                resizeMode="cover"
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
      {/* </Animatable.View> */}
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
