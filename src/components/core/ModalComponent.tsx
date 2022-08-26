import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Modal, Radio, VStack} from 'native-base';
import {useIsMounted} from 'hooks';
type Props = {
  showModalComponent: boolean;
  setShowModalComponent: (previous: boolean) => void;
  children: React.ReactElement;
  title: string;
};

const ModalComponent = ({
  showModalComponent,
  setShowModalComponent,
  children,
  title,
}: Props) => {
  const isMounted = useIsMounted();
  return (
    <Modal
      isOpen={showModalComponent}
      onClose={() => {
        isMounted.current && setShowModalComponent(false);
      }}
      size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({});
