import {ScrollView, TouchableOpacity} from 'react-native';
import {Box, Image, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {COLORS} from 'configs';
import {CATEGORYARR} from '../../constants';

type categoryType = {
  label?: string | any;
  id?: any;
  img?: string | any;
};

const CategoryButtom = ({
  selectionMode,
  onSelectSwitch,
  data,
  setCategoryName,
}: any) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  //for switch the button
  const updateSwitchData = (value: categoryType) => {
    setSelectionMode(value?.id);
    onSelectSwitch(value?.id);
    setCategoryName(value?.label);
  };
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
              key={item.id}
              style={{
                // backgroundColor:
                //   getSelectionMode == item?.id ? COLORS.textWhite : '#eae8e4',
                marginTop: 10,
              }}
              activeOpacity={1}
              onPress={() => updateSwitchData(item)}>
              <VStack alignItems={'center'} mt={2}>
                <Box
                  bg={
                    getSelectionMode == item?.id ? 'amber.200' : 'secondary.200'
                  }
                  borderRadius={5}>
                  <Image
                    alt="categoryImg"
                    source={item?.img}
                    style={{
                      width: 50,
                      height: 50,
                      paddingHorizontal: 3,
                    }}
                    resizeMode={'contain'}
                  />
                </Box>
                <Text
                  color={
                    getSelectionMode == item?.id ? '#000' : COLORS.fadeBlack
                  }
                  fontFamily={
                    getSelectionMode == item?.id
                      ? 'Nunito-Bold'
                      : 'Nunito-Regular'
                  }>
                  {item?.label}
                </Text>
              </VStack>
              {getSelectionMode == item?.id && (
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
