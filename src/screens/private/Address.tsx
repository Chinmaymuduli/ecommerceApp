import {Alert, Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Actionsheet,
  Box,
  FormControl,
  Heading,
  HStack,
  Input,
  Pressable,
  Radio,
  ScrollView,
  Text,
  useDisclose,
} from 'native-base';
import {COLORS} from 'configs';
import {Controller, useForm} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COUNTRY_DATA, INDIANSTATE} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {AddressType} from 'types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {post} from 'api';
import {useActions, useIsMounted} from 'hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CountryPicker, ErrorModal} from 'components/core';

type Props = NativeStackScreenProps<PrivateRoutesType, 'Address'>;
const Address = ({route, navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [loader, setLoader] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(1);
  const [state, setState] = React.useState<string>('Chhattisgarh');
  const [addressTypeText, setAddressTypeText] = useState('Home');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [label, setLabel] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState({
    code: 'IN',
    label: 'India',
    phone: '91',
  });

  console.log({country});

  const isMounted = useIsMounted();
  const {setLoading} = useActions();
  const onSubmit = async (data: AddressType) => {
    console.log('dataAddress', data);
    try {
      isMounted.current && setLoading(true);
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const AddressData = JSON.stringify({
        landmark: data?.housenumber,
        email: data.email,
        phoneNumber: data.phoneNumber,
        countryCode: country?.phone,
        name: data.firstName,
        street: data.roadName,
        city: data.city,
        state: state,
        country: 'india',
        zip: data.pincode,
        isDefault: true,
        type: addressTypeText,
      });

      const postAddress = await post({
        path: 'address',
        body: AddressData,
        token: token,
      });
      if (postAddress.status === 200) {
        navigation.navigate('SelectAddress', {});
      } else {
        Alert.alert('Error', postAddress?.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };

  const Hometype = () => {
    setSelectedType(1);
    setAddressTypeText('HOME');
  };

  const Worktype = () => {
    setSelectedType(2);
    setAddressTypeText('WORK');
  };
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Box px={4} mb={3}>
          <FormControl isRequired isInvalid={'firstName' in errors}>
            <FormControl.Label>Name</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  placeholder="John"
                  onChangeText={val => onChange(val)}
                  value={value}
                  fontSize={15}
                />
              )}
              name="firstName"
              rules={{required: 'Name is required', minLength: 3}}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.firstName?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'phoneNumber' in errors} mt={2}>
            <FormControl.Label>Phone number</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  onChangeText={val => onChange(val)}
                  value={value}
                  fontSize={15}
                  InputLeftElement={
                    <>
                      <Pressable onPress={() => setModalVisible(true)}>
                        <HStack>
                          <Box px={2}>
                            <Text>+{country?.phone}</Text>
                          </Box>
                          <Box borderWidth={1.2}></Box>
                        </HStack>
                      </Pressable>
                    </>
                  }
                />
              )}
              name="phoneNumber"
              rules={{required: 'Phone Number is required', minLength: 3}}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.phoneNumber?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'email' in errors} mt={2}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  placeholder="Enter Email"
                  autoCapitalize="none"
                  onChangeText={val => onChange(val)}
                  value={value}
                  fontSize={15}
                />
              )}
              name="email"
              rules={{required: 'Email is required'}}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.email?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Box flexDirection={'row'}>
            <Box w={Dimensions.get('window').width / 2.3}>
              <FormControl isRequired isInvalid={'pincode' in errors} mt={2}>
                <FormControl.Label>Pincode</FormControl.Label>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      placeholder="pincode"
                      keyboardType="numeric"
                      onChangeText={val => onChange(val)}
                      value={value}
                      fontSize={15}
                    />
                  )}
                  name="pincode"
                  rules={{required: 'Pincode is required', minLength: 3}}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.pincode?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Pressable
              ml={5}
              bg={COLORS.primary}
              mt={9}
              //   mb={4}
              borderRadius={5}
              justifyContent={'center'}>
              <HStack px={3} space={2}>
                <MaterialIcons
                  name="my-location"
                  size={20}
                  color={COLORS.textWhite}
                />
                <Text color={COLORS.textWhite}>Use my location</Text>
              </HStack>
            </Pressable>
          </Box>
          <Box flexDirection={'row'} mt={2}>
            <Box w={Dimensions.get('window').width / 2.3}>
              <FormControl isRequired isInvalid={'city' in errors}>
                <FormControl.Label>City</FormControl.Label>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      placeholder="Enter your City"
                      onChangeText={val => onChange(val)}
                      value={value}
                      fontSize={15}
                    />
                  )}
                  name="city"
                  rules={{required: 'City is required', minLength: 3}}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.city?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Box mt={1} ml={5} w={150}>
              <Text bold color={COLORS.fadeBlack}>
                State
              </Text>
              <Pressable
                mt={1}
                onPress={onOpen}
                borderWidth={1}
                borderColor={COLORS.lightGrey}
                borderRadius={5}>
                <HStack
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  px={2}>
                  <Text py={3} color={COLORS.fadeBlack} flexWrap={'wrap'}>
                    {state}
                  </Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={COLORS.fadeBlack}
                  />
                </HStack>
              </Pressable>
            </Box>
          </Box>

          <FormControl isRequired isInvalid={'housenumber' in errors} mt={2}>
            <FormControl.Label>House No., Building name</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  placeholder="Enter House No., Building name"
                  onChangeText={val => onChange(val)}
                  value={value}
                  fontSize={15}
                />
              )}
              name="housenumber"
              rules={{required: 'Field is required', minLength: 3}}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.housenumber?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'roadName' in errors} mt={2}>
            <FormControl.Label>Road Name, Area, Colony</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  placeholder="Enter House No., Building name"
                  onChangeText={val => onChange(val)}
                  value={value}
                  fontSize={15}
                />
              )}
              name="roadName"
              rules={{required: 'Field is required', minLength: 3}}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.roadName?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Address type */}
          <Box mt={4}>
            <Text bold>Type of address</Text>
            <HStack space={5} mt={3}>
              <Pressable
                onPress={() => Hometype()}
                borderWidth={1}
                borderRadius={15}
                bg={selectedType === 1 ? '#98FB9860' : COLORS.textWhite}
                borderColor={
                  selectedType === 1 ? COLORS.primary : COLORS.lightGrey
                }>
                <HStack alignItems={'center'} px={3} py={1} space={3}>
                  <Ionicons
                    name="home-sharp"
                    size={17}
                    color={
                      selectedType === 1 ? COLORS.primary : COLORS.fadeBlack
                    }
                  />
                  <Text
                    color={
                      selectedType === 1 ? COLORS.primary : COLORS.fadeBlack
                    }>
                    Home
                  </Text>
                </HStack>
              </Pressable>

              <Pressable
                onPress={() => Worktype()}
                borderWidth={1}
                borderRadius={15}
                bg={selectedType === 2 ? '#98FB9860' : COLORS.textWhite}
                borderColor={
                  selectedType === 2 ? COLORS.primary : COLORS.lightGrey
                }>
                <HStack alignItems={'center'} px={3} py={1} space={3}>
                  <FontAwesome5
                    name="building"
                    size={16}
                    color={
                      selectedType === 2 ? COLORS.primary : COLORS.fadeBlack
                    }
                  />
                  <Text
                    color={
                      selectedType === 2 ? COLORS.primary : COLORS.fadeBlack
                    }>
                    Work
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
            <Pressable mt={7} onPress={handleSubmit(onSubmit)}>
              <Box bg={COLORS.primary} borderRadius={5}>
                <Text
                  color={COLORS.textWhite}
                  bold
                  textAlign={'center'}
                  py={2}
                  letterSpacing={1}>
                  Save And Deliver
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
      {/* Actionsheet */}
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content>
          <Box w={'100%'}>
            <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                px={3}>
                <Heading size={'sm'} py={2}>
                  Select State
                </Heading>
                <AntDesign
                  name="close"
                  size={20}
                  color={COLORS.fadeBlack}
                  onPress={onClose}
                />
              </HStack>
            </Box>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box mt={4} mb={4}>
                {INDIANSTATE.map((item, index) => (
                  <Box key={index} pb={5}>
                    <Radio.Group
                      name="myRadioGroup"
                      accessibilityLabel="favorite number"
                      value={state}
                      onChange={nextValue => {
                        setState(nextValue);
                        onClose();
                      }}>
                      <Radio value={item.name} my={1}>
                        {item.name}
                      </Radio>
                    </Radio.Group>
                  </Box>
                ))}
              </Box>
            </ScrollView>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>

      {/* modal */}
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        showErrorModal={showErrorModal}
        label={label}
      />

      <CountryPicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={COUNTRY_DATA}
        setCountry={setCountry}
      />
    </Box>
  );
};

export default Address;

const styles = StyleSheet.create({});
