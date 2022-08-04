import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Box, Heading, HStack, Row, VStack} from 'native-base';
import {AlertComponent, CategoryButtom, FetchLoader} from 'components/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {COLORS} from 'configs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {CategorySection} from 'components';
import {useStore} from 'app';
import {useSwrApi} from 'hooks';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Category'>;
const Category = ({route}: Props) => {
  const {category, products} = useStore();

  const categoryItem = useSwrApi('categories');

  const CategoryData = categoryItem?.data?.data?.data;

  const AYUSH_PRODUCTS = products.filter(
    pd => pd.category === 'ayush products',
  );
  const GOURMET = products.filter(pd => pd.category === 'gourmet foods');
  const PERSONAL_CARE = products.filter(pd => pd.category === 'personal care');
  const HOME_CARE = products.filter(pd => pd.category === 'home care');
  const SWEET = products.filter(pd => pd.category === 'sweets');
  const navigation = useNavigation<NavigationProps>();
  const [categoryName, setCategoryName] = useState('');
  const [tabValue, setTabValue] = useState<string>('62dfbef7eb6710078e1a6e5d');
  const [openAlert, setOpenAlert] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState('Successfully added');

  const onSelectSwitch = useCallback((value: string) => {
    setTabValue(value);
  }, []);

  const [ayushProducts, setAyushProducts] = useState<any>();

  const {data, isLoading, mutate} = useSwrApi('products');
  const categoryData = data?.data?.data?.data;

  useEffect(() => {
    const CATEGORY_PRODUCT1 = categoryData
      ?.filter(
        (item: {category: {name: string}; type: string}) =>
          item?.category?.name === 'Ayush' && item?.type === 'B2C',
      )
      .slice(0, 4);
    setAyushProducts(CATEGORY_PRODUCT1);
  }, [data, CategoryData]);

  console.log('first', tabValue);

  return (
    <>
      {!isLoading ? (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <Box borderBottomWidth={1.5} borderColor={COLORS.lightGrey}>
            <HStack justifyContent={'space-between'} px={4} py={3}>
              <HStack alignItems={'center'} space={4}>
                <Ionicons
                  name="menu"
                  size={24}
                  color="#000"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
                <Heading size={'md'}>
                  {categoryName || 'All Categories'}
                </Heading>
              </HStack>
            </HStack>
          </Box>
          {/* <ScrollView> */}
          <Row>
            <Box w={'1/4'}>
              <CategoryButtom
                // selectedId={route.params?.id || 1}
                selectionMode={'62dfbef7eb6710078e1a6e5d'}
                onSelectSwitch={onSelectSwitch}
                data={CategoryData}
                // data={category}
                setCategoryName={setCategoryName}
              />
            </Box>

            <VStack>
              <Box>
                {tabValue === '62dfbef7eb6710078e1a6e5d' && (
                  <CategorySection
                    // data={userData?.role === 'b2b' ? AYUSHRAWPRODUCT : AYUSHPRODUCT}
                    data={ayushProducts}
                    // data={AYUSH_PRODUCTS}
                    setOpenAlert={setOpenAlert}
                    setAlertMessage={setAlertMessage}
                    isBusiness={route.params?.isBussiness}
                  />
                )}
              </Box>
              <Box>
                {tabValue === '62e0cfb8cb3ecd83a0c06a7e' && (
                  <CategorySection
                    // data={
                    //   userData?.role === 'b2b' ? GOURMETRAWPRODUCT : GOURMETPRODUCT
                    // }
                    data={GOURMET}
                    setOpenAlert={setOpenAlert}
                    setAlertMessage={setAlertMessage}
                    isBusiness={route.params?.isBussiness}
                  />
                )}
              </Box>
              <Box>
                {tabValue === '62e8cc015db377fecb1b9ee8' && (
                  <CategorySection
                    // data={
                    //   userData?.role === 'b2b' ? GOURMETRAWPRODUCT : PERSONALPRODUCT
                    // }
                    data={PERSONAL_CARE}
                    setOpenAlert={setOpenAlert}
                    setAlertMessage={setAlertMessage}
                    isBusiness={route.params?.isBussiness}
                  />
                )}
              </Box>
              <Box>
                {/* {tabValue === 4 && (
                  <CategorySection
                    // data={
                    //   userData?.role === 'b2b' ? GOURMETRAWPRODUCT : HOMEPRODUCT
                    // }
                    // data={ayushProducts}
                    data={HOME_CARE}
                    setOpenAlert={setOpenAlert}
                    setAlertMessage={setAlertMessage}
                    isBusiness={route.params?.isBussiness}
                  />
                )} */}
                {categoryName === 'Ayush' && (
                  <CategorySection
                    // data={
                    //   userData?.role === 'b2b' ? GOURMETRAWPRODUCT : HOMEPRODUCT
                    // }
                    data={ayushProducts}
                    // data={HOME_CARE}
                    setOpenAlert={setOpenAlert}
                    setAlertMessage={setAlertMessage}
                    isBusiness={route.params?.isBussiness}
                  />
                )}
              </Box>
              <Box>
                {tabValue === '62e9177f1bf067fea52164f2' && (
                  <CategorySection
                    // data={userData?.role === 'b2b' ? SWEETRAW : SWEETPRODUCT}
                    data={SWEET}
                    setOpenAlert={setOpenAlert}
                    setAlertMessage={setAlertMessage}
                    isBusiness={route.params?.isBussiness}
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
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default Category;

const styles = StyleSheet.create({});
