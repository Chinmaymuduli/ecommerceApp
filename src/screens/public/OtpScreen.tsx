import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import React, {MutableRefObject, useRef} from 'react';
import {
  ArrowForwardIcon,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Pressable,
  Spinner,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import LottieView from 'lottie-react-native';
import {SUCCESS} from 'assets';
import OTPTextInput from 'react-native-otp-textinput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigation} from 'src/routes/PublicRoutes';

const OtpScreen = () => {
  let outInput = useRef(null);
  const navigation = useNavigation<PublicNavigation>();
  const [code, setCode] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.textWhite}}>
      <Pressable p={4} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={30} color={COLORS.fadeBlack} />
      </Pressable>
      <Center w={'full'} h={Dimensions.get('window').height * 0.2} mt={5}>
        <LottieView source={SUCCESS} autoPlay loop={false} />
      </Center>
      <Text
        alignSelf={'center'}
        mt={8}
        fontFamily={'Nunito-Bold'}
        fontWeight={200}
        fontStyle="normal"
        fontSize={18}
        color={COLORS.textSecondary}>
        Code sent to bbggu@gmail.com
      </Text>
      <Center mt={5}>
        <Flex flexDirection="row">
          <OTPTextInput
            ref={(e: MutableRefObject<null>) => (outInput = e)}
            inputCount={6}
            textInputStyle={styles.otpTextInput}
            tintColor={COLORS.primary}
            offTintColor={'#e4e4e4'}
            handleTextChange={(text: any) => setCode(text)}
          />
        </Flex>
      </Center>
      <Box p={3}>
        {loader ? (
          <HStack
            space={2}
            style={styles.sendOtpButton}
            justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" color={'white'} />
            <Heading color="white" fontSize="md" mt={1}>
              Verifying OTP
            </Heading>
          </HStack>
        ) : (
          <Button
            // onPress={() => ConfirmOtp()}
            onPress={() => navigation.navigate('ResetPassword')}
            style={styles.sendOtpButton}
            fontSize={18}
            color={COLORS.textWhite}
            colorScheme="success"
            endIcon={<ArrowForwardIcon size="5" color={COLORS.textWhite} />}>
            Verify and Continue
          </Button>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  sendOtpButton: {
    marginTop: 10,
    padding: 12,
    textAlign: 'center',
    borderRadius: 5,
    shadowOffset: {height: 2, width: 2}, // IOS
    shadowOpacity: 5, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
    height: 55,
    backgroundColor: COLORS.cgcolor,
    shadowColor: COLORS.fadeBlack,
  },
  otpTextInput: {
    backgroundColor: COLORS.textWhite,
    borderBottomWidth: 0,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    borderRadius: 5,
  },
});
