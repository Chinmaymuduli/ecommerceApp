import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Box, Heading, HStack, Row, VStack} from 'native-base';
import {AlertComponent, CategoryButtom} from 'components/core';
import {
  AYUSHPRODUCT,
  AYUSHRAWPRODUCT,
  GOURMETPRODUCT,
  GOURMETRAWPRODUCT,
  HOMEPRODUCT,
  PERSONALPRODUCT,
  SWEETPRODUCT,
  SWEETRAW,
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {COLORS} from 'configs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
import {CategorySection} from 'components';
import {useStore} from 'app';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Category'>;
const Category = ({route}: Props) => {
  // console.log('objectRoute', route.params?.isBussiness);
  const {category, products} = useStore();
  const AYUSHPRODUCTS = products.filter(pd => pd.category === 'ayush products');
  const GOURMEET = products.filter(pd => pd.category === 'gourmet foods');
  const PERSONALCARE = products.filter(pd => pd.category === 'personal care');
  const HOMECARE = products.filter(pd => pd.category === 'home care');
  const SWEET = products.filter(pd => pd.category === 'sweets');
  const navigation = useNavigation<NavigationProps>();
  const [categoryName, setCategoryName] = useState('');
  const [tabValue, setTabValue] = useState(1);
  const [openAlert, setOpenAlert] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState('Successfully added');
  const {userData} = useAppContext();

  const onSelectSwitch = useCallback((value: React.SetStateAction<number>) => {
    setTabValue(value);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Box borderBottomWidth={1.5} borderColor={COLORS.lightGrey}>
        <HStack justifyContent={'space-between'} px={4} py={3}>
          <HStack alignItems={'center'} space={4}>
            <Ionicons
              name="menu"
              size={24}
              color="#000"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <Heading size={'md'}>{categoryName || 'All Categories'}</Heading>
          </HStack>
        </HStack>
      </Box>
      {/* <ScrollView> */}
      <Row>
        <Box w={'1/4'}>
          <CategoryButtom
            seletedId={route.params?.id || 1}
            selectionMode={1}
            onSelectSwitch={onSelectSwitch}
            data={category}
            setCategoryName={setCategoryName}
          />
        </Box>

        <VStack>
          <Box>
            {tabValue === 1 && (
              <CategorySection
                // data={userData?.role === 'b2b' ? AYUSHRAWPRODUCT : AYUSHPRODUCT}
                data={AYUSHPRODUCTS}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
                isBussiness={route.params?.isBussiness}
              />
            )}
          </Box>
          <Box>
            {tabValue === 2 && (
              <CategorySection
                // data={
                //   userData?.role === 'b2b' ? GOURMETRAWPRODUCT : GOURMETPRODUCT
                // }
                data={GOURMEET}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
                isBussiness={route.params?.isBussiness}
              />
            )}
          </Box>
          <Box>
            {tabValue === 3 && (
              <CategorySection
                // data={
                //   userData?.role === 'b2b' ? GOURMETRAWPRODUCT : PERSONALPRODUCT
                // }
                data={PERSONALCARE}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
                isBussiness={route.params?.isBussiness}
              />
            )}
          </Box>
          <Box>
            {tabValue === 4 && (
              <CategorySection
                // data={
                //   userData?.role === 'b2b' ? GOURMETRAWPRODUCT : HOMEPRODUCT
                // }
                data={HOMECARE}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
                isBussiness={route.params?.isBussiness}
              />
            )}
          </Box>
          <Box>
            {tabValue === 5 && (
              <CategorySection
                // data={userData?.role === 'b2b' ? SWEETRAW : SWEETPRODUCT}
                data={SWEET}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
                isBussiness={route.params?.isBussiness}
              />
            )}
          </Box>
        </VStack>
      </Row>
      {/* Alert */}
      <AlertComponent
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        setAlertMessage={setAlertMessage}
        alertMessage={alertMessage}
      />
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({});
