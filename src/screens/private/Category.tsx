import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  Box,
  Heading,
  HStack,
  Row,
  ScrollView,
  VStack,
  Text,
} from 'native-base';
import {AlertComponent, AyushProduct, CategoryButtom} from 'components/core';
import {
  AYUSHPRODUCT,
  CATEGORYARR,
  GOURMETPRODUCT,
  HOMEPRODUCT,
  PERSONALPRODUCT,
  SWEETPRODUCT,
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {COLORS} from 'configs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Category'>;
const Category = ({route}: Props) => {
  // console.log('object', route.params);
  const navigation = useNavigation<NavigationProps>();
  const [categoryName, setCategoryName] = useState('');
  const [tabValue, setTabValue] = useState(1);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Successfully added');
  const onSelectSwitch = useCallback((value: React.SetStateAction<number>) => {
    setTabValue(value);
  }, []);
  // console.log('object', tabValue);
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
            data={CATEGORYARR}
            setCategoryName={setCategoryName}
          />
        </Box>

        <VStack>
          <Box>
            {tabValue === 1 && (
              <AyushProduct
                data={AYUSHPRODUCT}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            )}
          </Box>
          <Box>
            {tabValue === 2 && (
              <AyushProduct
                data={GOURMETPRODUCT}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            )}
          </Box>
          <Box>
            {tabValue === 3 && (
              <AyushProduct
                data={PERSONALPRODUCT}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            )}
          </Box>
          <Box>
            {tabValue === 4 && (
              <AyushProduct
                data={HOMEPRODUCT}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
              />
            )}
          </Box>
          <Box>
            {tabValue === 5 && (
              <AyushProduct
                data={SWEETPRODUCT}
                setOpenAlert={setOpenAlert}
                setAlertMessage={setAlertMessage}
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
