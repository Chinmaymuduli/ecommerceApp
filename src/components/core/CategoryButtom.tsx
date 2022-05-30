import {ScrollView, TouchableOpacity} from 'react-native';
import {Box, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {COLORS} from 'configs';
import {CATEGORYARR} from '../../constants';

type categoryType = {
  label?: string;
  id?: any;
  img?: string;
};

const CategoryButtom = ({selectionMode, onSelectSwitch, data}: any) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  //for switch the button
  const updateSwitchData = (value: number) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };
  return (
    <Box>
      <ScrollView>
        <VStack bg={'secondary.200'} flex={1}>
          {data?.map((item: categoryType) => (
            <TouchableOpacity
              style={{
                backgroundColor:
                  getSelectionMode == item?.id ? COLORS.textWhite : '#eae8e4',
              }}
              activeOpacity={1}
              onPress={() => updateSwitchData(item?.id)}>
              <Text
                py={'3'}
                px={'7'}
                color={
                  getSelectionMode == item?.id ? '#0000FF' : COLORS.fadeBlack
                }
                fontFamily={'Nunito-Bold'}>
                {item?.label}
              </Text>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default CategoryButtom;
