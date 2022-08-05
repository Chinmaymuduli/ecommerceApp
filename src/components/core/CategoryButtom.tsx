import {ScrollView, TouchableOpacity} from 'react-native';
import {Box, Image, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {COLORS} from 'configs';
import {useSwrApi} from 'hooks';

type categoryType = {
  categoryName?: string | any;
  id?: any;
  img?: string | any;
  _id?: string;
  description?: string;
  imageURL?: string;
  isActive?: boolean;
  name?: string;
  setCategoryId?: string;
};

const CategoryButtom = ({
  selectedId,
  selectionMode,
  data,
  setCategoryName,
  setCategoryId,
}: any) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  //for switch the button
  const updateSwitchData = (value: categoryType) => {
    setSelectionMode(value?._id);
    setCategoryName(value?.name);
    setCategoryId(value?._id);
  };
  // useEffect(() => {
  //   if (!selectedId) {
  //     updateSwitchData(data[0]);
  //   }
  //   updateSwitchData(data.find((item: categoryType) => item.id === selectedId));
  // }, [selectedId, data]);

  return (
    <Box>
      <ScrollView>
        <VStack
          flex={1}
          h={600}
          borderRightWidth={1}
          borderColor={COLORS.lightGrey}>
          {data?.map((item: categoryType) => (
            <TouchableOpacity
              key={item._id}
              style={{
                marginTop: 10,
              }}
              activeOpacity={1}
              onPress={() => updateSwitchData(item)}>
              <VStack alignItems={'center'} mt={2}>
                <Box
                  bg={
                    getSelectionMode == item?._id
                      ? 'amber.200'
                      : 'secondary.200'
                  }
                  borderRadius={5}>
                  <Image
                    alt="categoryImg"
                    source={{
                      uri: item?.imageURL
                        ? item?.imageURL
                        : 'https://5.imimg.com/data5/DR/DY/MY-52827986/herbal-products-500x500.jpg',
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      paddingHorizontal: 3,
                    }}
                    resizeMode={'contain'}
                  />
                </Box>
                <Text
                  textAlign={'center'}
                  color={
                    getSelectionMode == item?._id ? '#000' : COLORS.fadeBlack
                  }
                  fontFamily={
                    getSelectionMode == item?._id
                      ? 'Nunito-Bold'
                      : 'Nunito-Regular'
                  }>
                  {item?.name}
                </Text>
              </VStack>
              {getSelectionMode === item?._id && (
                <Box
                  // mt={3}
                  h={20}
                  w={2}
                  borderRadius={3}
                  borderRightWidth={3}
                  borderColor={'#000'}
                  position={'absolute'}
                  right={0}></Box>
              )}
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default CategoryButtom;
