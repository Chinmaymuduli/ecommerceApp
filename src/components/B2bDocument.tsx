import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Modal,
  Pressable,
  Radio,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImagePicker} from './core';
import {useIsMounted, useSwrApi} from 'hooks';

const B2bDocument = () => {
  const [showModal, setShowModal] = useState(false);
  const [gstDocument, setGstDocument] = useState();
  const [visible, setVisible] = useState(false);
  const [whyModal, setWhyModal] = useState(false);
  const [document, setDocument] = useState<string>();
  const isMounted = useIsMounted();

  // console.log({document});
  const {data, isValidating, mutate} = useSwrApi('user/my-account');
  const userData = data?.data?.data;
  const handleDismiss = () => {
    setVisible(false);
  };

  const handelCancel = () => {
    isMounted.current && setDocument('');
    isMounted.current && setShowModal(false);
  };

  useEffect(() => {
    isMounted.current && setDocument(userData?.GSTDoc);
  }, [userData]);
  return (
    <>
      <Box px={5} mt={5}>
        <Text bold color={COLORS.secondary}>
          Please select one document for verification
        </Text>
        <Pressable
          w={'100%'}
          h={10}
          onPress={() => setShowModal(true)}
          mt={3}
          borderWidth={1}
          borderColor={COLORS.lightGrey}
          borderRadius={5}>
          <HStack
            alignItems={'center'}
            px={2}
            space={3}
            py={2}
            justifyContent={'space-between'}>
            <Text bold>{document ? document : 'Choose Document'}</Text>
            <Ionicons name="chevron-down" size={20} />
          </HStack>
        </Pressable>

        <HStack alignItems={'center'} space={4} pt={8}>
          <Text bold>Upload Document</Text>
          <Pressable onPress={() => setWhyModal(true)}>
            <HStack
              alignItems={'center'}
              borderWidth={1}
              borderRadius={5}
              borderColor={COLORS.secondary}
              px={1}>
              <Ionicons
                name="information-circle"
                size={20}
                color={COLORS.secondary}
              />
              <Text color={COLORS.secondary} bold>
                Why ?
              </Text>
            </HStack>
          </Pressable>
        </HStack>

        <Box
          borderWidth={1}
          mt={7}
          borderColor={COLORS.lightGrey}
          borderRadius={5}>
          <Pressable onPress={() => setVisible(true)}>
            {gstDocument ? (
              <Image
                alt="gstDocument"
                source={{
                  uri: gstDocument,
                }}
                height={150}
              />
            ) : (
              <VStack
                justifyContent={'center'}
                alignItems={'center'}
                height={150}>
                <MaterialCommunityIcons name="camera-plus" size={30} />
                <Text fontSize={15} color={COLORS.secondary} mt={2}>
                  Upload Photo
                </Text>
              </VStack>
            )}
          </Pressable>
        </Box>
        <Box borderWidth={1} borderRadius={5} bg={COLORS.primary} mt={7}>
          <Text textAlign={'center'} bold py={2} color={COLORS.textWhite}>
            Save Document
          </Text>
        </Box>
      </Box>
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Choose Documents</Modal.Header>
            <Modal.Body>
              <Radio.Group
                name="myRadioGroup"
                value={document}
                onChange={nextValue => {
                  isMounted.current && setDocument(nextValue);
                }}
                accessibilityLabel="Pick your favorite number">
                <Radio value="Bill Book" my={4}>
                  Bill Book
                </Radio>
                <Divider />
                <Radio value="Visiting Card" my={4} size={'md'}>
                  Visiting Card
                </Radio>
                <Divider />
                <Radio value="Shop Photo" my={4}>
                  Shop Photo
                </Radio>
                <Divider />
              </Radio.Group>
              <Box px={5} mt={3}>
                <HStack justifyContent={'space-between'}>
                  <Pressable
                    onPress={handelCancel}
                    borderWidth={1}
                    borderColor={'red.800'}
                    borderRadius={5}>
                    <Text color={'red.800'} bold px={4} py={1}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setShowModal(false)}
                    borderWidth={1}
                    borderColor={COLORS.primary}
                    borderRadius={5}>
                    <Text
                      color={COLORS.primary}
                      bold
                      fontSize={16}
                      px={4}
                      py={1}>
                      Done
                    </Text>
                  </Pressable>
                </HStack>
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
      {/* why modal */}
      <Center>
        <Modal isOpen={whyModal} onClose={() => setWhyModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Why Verification ?</Modal.Header>
            <Modal.Body>
              <Text>
                We need a verification document to authenticate our Buyers.
                {'\n'}It can be uploaded later from order summary page.{'\n'}
                It is required only on placing order for the first time
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>

      {/* image picker */}
      {/* <ImagePicker
        visible={visible}
        onDismiss={handleDismiss}
        setImageURI={setGstDocument}
        cropperCircleOverlay={true}
        postImages={false}
      /> */}
    </>
  );
};

export default B2bDocument;

const styles = StyleSheet.create({});
