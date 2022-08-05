import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AlertDialog, Button} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {remove} from 'api';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  id?: string;
  mutate: () => void;
};

const CartAlert = ({isOpen, onClose, id, mutate}: Props) => {
  const cancelRef = React.useRef(null);

  const handleDelete = async (id: any) => {
    console.log('iddd', id);
    try {
      const getAccessToken = await AsyncStorage.getItem('access_token');

      await remove({
        path: `cart/${id}`,
        token: getAccessToken,
      });
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', error.message);
    } finally {
      mutate();
      onClose();
    }
  };
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Delete Item</AlertDialog.Header>
        <AlertDialog.Body>
          This will remove cart item . This action cannot be reversed. Deleted
          data can not be recovered.
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}>
              Cancel
            </Button>
            <Button
              colorScheme="danger"
              onPress={() => handleDelete(id)}
              //   onPress={() => console.log('Deleted', id)}
            >
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default CartAlert;

const styles = StyleSheet.create({});
