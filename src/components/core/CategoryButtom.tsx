import {ScrollView, TouchableOpacity} from 'react-native';
import {Box, Image, Pressable, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {COLORS} from 'configs';
import {PRODUCT_PLACEHOLDER} from 'assets';

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
  const updateSwitchData = (value: categoryType) => {
    setSelectionMode(value?._id);
    setCategoryName(value?.name);
    setCategoryId(value?._id);
  };
  useEffect(() => {
    updateSwitchData(
      data?.data?.find((item: categoryType) => item?._id === selectedId),
    );
    if (!selectedId) updateSwitchData(data?.[0]);
  }, [selectedId, data]);

  return (
    <Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 300,
        }}>
        <VStack
          flex={1}
          h={600}
          borderRightWidth={1}
          borderColor={COLORS.lightGrey}>
          <Pressable
            onPress={() => {
              setCategoryId(''), setSelectionMode('');
            }}>
            <VStack alignItems={'center'} mt={3}>
              <Box
                bg={getSelectionMode == '' ? 'amber.200' : 'secondary.200'}
                borderRadius={5}>
                <Image
                  alt="categoryImg"
                  source={PRODUCT_PLACEHOLDER}
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
                color={getSelectionMode == '' ? '#000' : COLORS.fadeBlack}>
                All
              </Text>
            </VStack>
            {!getSelectionMode && (
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
          </Pressable>
          {data?.data?.map((item: categoryType) => (
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
                    source={
                      item?.imageURL
                        ? {
                            uri: item?.imageURL,
                          }
                        : PRODUCT_PLACEHOLDER
                    }
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
