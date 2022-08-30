import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Box, Center, Heading, HStack, Row, Spinner, VStack} from 'native-base';
import {AlertComponent, CategoryButtom, FetchLoader} from 'components/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {COLORS} from 'configs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {CategorySection} from 'components';
import {useIsMounted, useSwrApi} from 'hooks';
import {useAuth} from 'app';
import {ProductType} from 'types';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Category'>;
const Category = ({route: {params}}: Props) => {
  const categoryItem = useSwrApi('categories');
  const CategoryData = categoryItem?.data?.data?.data;
  const {user, userType} = useAuth();
  const navigation = useNavigation<NavigationProps>();
  const [categoryName, setCategoryName] = useState('');
  const [openAlert, setOpenAlert] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState('Successfully added');
  const [categoryId, setCategoryId] = useState<string>('');
  const isMounted = useIsMounted();
  const [sorting, setSorting] = useState<string | undefined>('default');
  const filterPrice = useRef<string>('');
  const filterRatting = useRef<string>('');
  const [filteredData, setFilterData] = useState<ProductType[]>([]);
  const [filterObject, setFilterObject] = useState<{
    category: string[] | undefined;
    rating: any[] | undefined;
    price: any[] | undefined;
  }>();
  const {data, isValidating, mutate} = useSwrApi(
    user?._id
      ? `products/filter?filter=${JSON.stringify(
          filterObject,
        )}&sortBy=${sorting}&userId=${user?._id}&type=${userType}`
      : `products/filter?filter=${JSON.stringify(
          filterObject,
        )}&sortBy=${sorting}`,
  );
  useEffect(() => {
    if (isMounted.current) {
      const filter = {
        price: filterPrice
          ? filterPrice.current.split('-').map(item => Number(item))
          : undefined,
        rating: filterRatting
          ? filterRatting?.current.split('-').map(item => Number(item))
          : undefined,
        category: categoryId ? [categoryId] : undefined,
      };
      !filterPrice.current && delete filter.price;
      !filterRatting.current && delete filter.rating;
      !categoryId && delete filter.category;
      // console.log({filter});
      setFilterObject(filter);
    }
  }, [CategoryData, filterPrice, filterRatting, categoryId]);
  const applyFilter = () => {
    if (isMounted.current) {
      const filter = {
        price: filterPrice
          ? filterPrice.current.split('-').map(item => Number(item))
          : undefined,
        rating: filterRatting
          ? filterRatting.current.split('-').map(item => Number(item))
          : undefined,
        category: categoryId ? [categoryId] : undefined,
      };
      !filterPrice.current && delete filter.price;
      !filterRatting.current && delete filter.rating;
      !categoryId && delete filter.category;
      setFilterObject(filter);
    }
  };
  useEffect(() => {
    isMounted.current && setFilterData(data?.data?.data?.data);
  }, [data]);

  return (
    <>
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
              selectedId={params?._id || ''}
              selectionMode={categoryId}
              data={CategoryData}
              setCategoryName={setCategoryName}
              setCategoryId={setCategoryId}
            />
          </Box>

          <VStack>
            <CategorySection
              filteredData={filteredData}
              setOpenAlert={setOpenAlert}
              setAlertMessage={setAlertMessage}
              businessType={userType}
              isValidating={isValidating}
              mutate={mutate}
              setSorting={setSorting}
              sorting={sorting}
              filterPrice={filterPrice}
              filterRatting={filterRatting}
              applyFilter={applyFilter}
            />
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
    </>
  );
};

export default Category;

const styles = StyleSheet.create({});
