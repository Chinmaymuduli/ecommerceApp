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
  const categoryItem = useSwrApi('categories');

  const CategoryData = categoryItem?.data?.data?.data;

  const navigation = useNavigation<NavigationProps>();
  const [categoryName, setCategoryName] = useState('');
  const [tabValue, setTabValue] = useState<string>('62dfbef7eb6710078e1a6e5d');
  const [openAlert, setOpenAlert] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState('Successfully added');
  const [categoryId, setCategoryId] = useState();

  console.log({categoryId});

  const onSelectSwitch = useCallback((value: string) => {
    setTabValue(value);
  }, []);

  const {data, isLoading, mutate} = useSwrApi(
    `category/${categoryId}/products`,
  );

  const CategoryProducts = data?.data?.data?.data;

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
                setCategoryName={setCategoryName}
                setCategoryId={setCategoryId}
              />
            </Box>

            <VStack>
              <Box>
                <CategorySection
                  data={CategoryProducts}
                  setOpenAlert={setOpenAlert}
                  setAlertMessage={setAlertMessage}
                  isBusiness={route.params?.isBussiness}
                />
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
