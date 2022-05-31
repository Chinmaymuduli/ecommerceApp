import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Box, Heading, HStack, Row, ScrollView, VStack} from 'native-base';
import {AyushProduct, CategoryButtom} from 'components/core';
import {
  AYUSHPRODUCT,
  CATEGORYARR,
  GOURMETPRODUCT,
  HOMEPRODUCT,
  PERSONALPRODUCT,
  SWEETPRODUCT,
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {COLORS} from 'configs';
const Category = () => {
  const navigation = useNavigation<NavigationProps>();
  const [categoryName, setCategoryName] = useState('');
  const [tabValue, setTabValue] = useState(1);
  // console.log('object', categoryName);
  const onSelectSwitch = useCallback((value: React.SetStateAction<number>) => {
    setTabValue(value);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Box borderBottomWidth={1.5} borderColor={COLORS.lightGrey}>
        <HStack justifyContent={'space-between'} px={4} py={3}>
          <HStack alignItems={'center'} space={3}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              onPress={() => navigation.goBack()}
            />
            <Heading size={'sm'}>{categoryName || 'All Categories'}</Heading>
          </HStack>
        </HStack>
      </Box>
      {/* <ScrollView> */}
      <Row>
        <Box w={'1/4'}>
          <CategoryButtom
            selectionMode={1}
            onSelectSwitch={onSelectSwitch}
            data={CATEGORYARR}
            setCategoryName={setCategoryName}
          />
        </Box>

        <VStack>
          <Box>{tabValue === 1 && <AyushProduct data={AYUSHPRODUCT} />}</Box>
          <Box>{tabValue === 2 && <AyushProduct data={GOURMETPRODUCT} />}</Box>
          <Box>{tabValue === 3 && <AyushProduct data={PERSONALPRODUCT} />}</Box>
          <Box>{tabValue === 4 && <AyushProduct data={HOMEPRODUCT} />}</Box>
          <Box>{tabValue === 5 && <AyushProduct data={SWEETPRODUCT} />}</Box>
        </VStack>
      </Row>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  // categoryHeader: {
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 0.84,
  //   elevation: 5,
  // },
});
