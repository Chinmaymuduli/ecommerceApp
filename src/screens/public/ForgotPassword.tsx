import {Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Center,
  Heading,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {forgotPassword} from 'assets';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigation} from 'src/routes/PublicRoutes';
import {post} from 'api';
import {ErrorModal} from 'components/core';
import {useActions, useIsMounted} from 'hooks';

const ForgotPassword = () => {
  const navigation = useNavigation<PublicNavigation>();
  const [email, setEmail] = useState<string>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [label, setLabel] = useState();
  const {setLoading} = useActions();
  const isMounted = useIsMounted();
  const handelForgotPassword = async () => {
    try {
      isMounted.current && setLoading(true);
      const verifyEmail = await post({
        path: 'auth/forgot-password',
        body: JSON.stringify({
          email: email,
        }),
      });
      console.log({verifyEmail});
      if (verifyEmail.status === 500) {
        setShowErrorModal(true);
        setLabel(verifyEmail.error);
        return;
      }
      navigation.navigate('OtpScreen', {email: email});
    } catch (error) {
      if (error instanceof Error) return Alert.alert('Error', error.message);
      return Alert.alert('Error', 'Something went wrong');
    } finally {
      isMounted.current && setLoading(false);
      setEmail('');
    }
  };
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Pressable p={4} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={28} color={COLORS.fadeBlack} />
      </Pressable>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Center>
          <Image
            source={forgotPassword}
            alt={'image'}
            style={{height: 300, width: 300}}
          />
        </Center>
        <Box px={5}>
          <Heading>Forgot Password ?</Heading>
          <Text fontSize={16} mt={2}>
            Don't worry! it happens. Please enter the email associated with your
            account.
          </Text>
          <Box mt={8}>
            <Input
              placeholder="Enter Your Email"
              variant={'underlined'}
              fontSize={15}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={em => setEmail(em)}
              InputRightElement={
                <>
                  <Ionicons name="at" size={30} color={COLORS.fadeBlack} />
                </>
              }
            />
          </Box>
          <Pressable mt={10} onPress={handelForgotPassword}>
            <Box bg={'#92E3A9'} borderRadius={5}>
              <Text
                color={COLORS.fadeBlack}
                bold
                textAlign={'center'}
                py={2}
                letterSpacing={1}>
                Submit
              </Text>
            </Box>
          </Pressable>
        </Box>
      </ScrollView>

      {/* Error Modal */}
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        showErrorModal={showErrorModal}
        label={label}
      />
    </Box>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
