import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  Divider,
  FlatList,
  HStack,
  Image,
  Input,
  Pressable,
  Text,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CountryPicker({
  modalVisible,
  setModalVisible,
  data,
  setCountry,
}: any) {
  const onItemPress = (item: any) => {
    setCountry(item);
    setModalVisible(false);
  };
  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <HStack py={4} px={5}>
        {item.code ? (
          <Image
            alt="image"
            source={{
              uri: `https://flagcdn.com/w20/${item.code.toLowerCase()}.png`,
            }}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        ) : null}
        <Text ml={3}> +{item.phone}</Text>
        <Text ml={5}>{item.label}</Text>
      </HStack>
      <Divider />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <HStack px={12} mt={2}>
            <Input
              // onChangeText={value => setSearch(value)}
              placeholder="Search by country"
              fontFamily={'Nunito-Bold'}
              flex={1}
              h={10}
              fontSize={15}
              pl={5}
            />
            <TouchableOpacity
              style={styles.logoClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close" size={25} />
            </TouchableOpacity>
          </HStack>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <FlatList
                initialNumToRender={20}
                windowSize={6}
                maxToRenderPerBatch={15}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.code.toString()}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  centeredView: {
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
  },
  modalView: {
    borderRadius: 10,
    paddingTop: 5,
  },
  logoClose: {
    position: 'absolute',
    top: 5,
    right: 10,
    color: '#000',
  },
});
