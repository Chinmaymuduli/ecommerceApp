import React, {useEffect, useRef, useState} from 'react';
import {Box, Center, Pressable, Text} from 'native-base';

import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {PublicNavigation} from 'src/routes/PublicRoutes';
import {useNavigation} from '@react-navigation/native';
import {addproduct, Delivery, deliveryman, ICONS} from 'assets';
import {COLORS} from 'configs';
import LottieView from 'lottie-react-native';

import Svg, {G, Circle} from 'react-native-svg';
import {useAuth} from 'app';

const onBoardingData = [
  {
    id: 1,
    img: addproduct,
    title: 'Select your items to buy',
    des: 'The forest grows and the forest provides . The women of the forest procure and create. Each product is handcrafted with care and love',
  },
  {
    id: 2,
    img: deliveryman,
    title: 'Order item from your shopping bag',
    des: 'All products of Chhattisgarh Herbals are powered by Chhattisgarh Minor Forest Produce Cooperative Federation,',
  },
  {
    id: 3,
    img: Delivery,
    title: 'Our system delivery item to you',
    des: '‘Chhattisgarh Herbals’ presents exciting business opportunities for individuals and businesses interested.',
  },
];

const OnBoarding = () => {
  const navigation = useNavigation<PublicNavigation>();
  const flatlistRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewableItems, setViewableItems] = useState<any>([]);
  const WINDOW_WIDTH = useWindowDimensions();
  const {user} = useAuth();
  // console.log({user});
  const handleViewableItemsChanged = useRef(({viewableItems}: any) => {
    setViewableItems(viewableItems);
  });
  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);
  //handle next
  const handleNext = () => {
    if (currentPage == onBoardingData.length - 1) return;

    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  //skip to end
  const handleSkipToEnd = () => {
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: onBoardingData.length - 1,
    });
  };

  const renderBottomSection = () => {
    const size = 50;
    const strokeWidth = 3;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null);
    const percentage = (currentPage + 1) * (100 / onBoardingData.length);
    const animation = (toValue: number) => {
      return Animated.timing(progressAnimation, {
        toValue,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
      animation(percentage);
    }, [percentage]);
    useEffect(() => {
      progressAnimation.addListener(value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      });
      return () => {
        progressAnimation.removeAllListeners();
      };
    }, []);
    return (
      <SafeAreaView>
        <Box style={styles.bottomContainer}>
          <Box
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            {
              // No. of dots
              [...Array(onBoardingData.length)].map((_, index) => (
                <Box
                  key={index}
                  style={{
                    // width: 10,
                    width: index == currentPage ? 20 : 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage ? COLORS.primary : '#0056d6' + '20',
                    marginRight: 8,
                  }}
                />
              ))
            }
          </Box>

          <Box
            mt={9}
            mb={4}
            bg={'red.100'}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}>
            <Svg width={size} height={size}>
              <G rotation="-90" origin={center}>
                <Circle
                  // stroke="#E6E7E8"
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={strokeWidth}
                />
                <Circle
                  ref={progressRef}
                  stroke={COLORS.primary}
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                />
              </G>
            </Svg>
            <Pressable
              alignItems={'center'}
              justifyContent={'center'}
              bg={COLORS.primary}
              borderRadius={40}
              p={2}
              position={'absolute'}>
              {currentPage != onBoardingData.length - 1 ? (
                <Box>
                  <ICONS.ChevronRight
                    size={24}
                    color={COLORS.textWhite}
                    onPress={handleNext}
                  />
                </Box>
              ) : (
                <Box>
                  <ICONS.Check
                    size={24}
                    color={COLORS.textWhite}
                    onPress={() => navigation.navigate('Login')}
                  />
                </Box>
              )}
            </Pressable>
          </Box>
        </Box>
      </SafeAreaView>
    );
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <Box style={styles.topHeader}>
          <Pressable onPress={handleSkipToEnd}>
            <Text
              py={1.5}
              px={2}
              bold
              fontWeight={500}
              color={COLORS.fadeBlack}
              style={{
                fontSize: 15,
                opacity: currentPage == onBoardingData.length - 1 ? 0 : 1,
              }}>
              Skip
            </Text>
          </Pressable>
        </Box>
      </SafeAreaView>
    );
  };

  const renderFlatListItem = ({item}: any) => {
    return (
      <Box style={styles.midContainer}>
        <Center h={300}>
          <Box h={300} w={'full'}>
            <LottieView source={item?.img} autoPlay loop />
          </Box>
        </Center>
        <Box alignItems={'center'} mt={3}>
          <Text fontFamily={'Nunito-Bold'} fontSize={17} color={COLORS.primary}>
            {item?.title}
          </Text>
        </Box>

        <Box alignItems={'center'} mt={4} px={4}>
          <Text
            textAlign={'center'}
            fontFamily={'Nunito-Regular'}
            fontSize={15}>
            {item?.des}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      {renderTopSection()}
      <FlatList
        data={onBoardingData}
        renderItem={renderFlatListItem}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        initialNumToRender={1}
        extraData={WINDOW_WIDTH}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
      />
      {renderBottomSection()}
    </Box>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#0056d6',
  },
  getStartedBtn: {
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#0056d6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  midContainer: {
    flex: 1,
    marginTop: 30,
    width: Dimensions.get('window').width,
  },

  animation: {
    width: '100%',
    height: 300,
    borderRadius: 25,
    backgroundColor: '#000',
  },
});
function percentage(percentage: any) {
  throw new Error('Function not implemented.');
}

function animation(percentage: number) {
  throw new Error('Function not implemented.');
}
