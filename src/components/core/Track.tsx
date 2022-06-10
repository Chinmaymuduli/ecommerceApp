import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {COLORS} from 'configs';
import {Box, Heading, Text} from 'native-base';
const labels: any = [
  <Box>
    <Text>Ordered</Text>
    <Text fontSize={12}>Tue,7th Jun 2020</Text>
  </Box>,
  <Box>
    <Text>Shipped</Text>
    <Text fontSize={12}>Wed,8th Jun 2020</Text>
  </Box>,
  <Box>
    <Text>Delivered</Text>
    <Text fontSize={12}>Fri,10th Jun 2020</Text>
  </Box>,
];

const Track = () => {
  const [position, setPosition] = useState(1);
  return (
    <View style={{height: 200, paddingLeft: 15}}>
      <StepIndicator
        stepCount={3}
        customStyles={{
          stepIndicatorSize: 10,
          separatorStrokeWidth: 3,
          currentStepIndicatorSize: 15,
          currentStepStrokeWidth: 3,
          stepStrokeCurrentColor: COLORS.cgcolor,
          stepStrokeFinishedColor: '#fe7013',
          stepStrokeUnFinishedColor: '#fff',
          separatorFinishedColor: COLORS.cgcolor,
          separatorUnFinishedColor: COLORS.lightGrey,
          stepIndicatorFinishedColor: COLORS.cgcolor,
          stepIndicatorUnFinishedColor: COLORS.lightGrey,
          stepIndicatorCurrentColor: '#ffffff',
          stepIndicatorLabelCurrentColor: '#fff',
          stepIndicatorLabelFinishedColor: COLORS.cgcolor,
          stepIndicatorLabelUnFinishedColor: COLORS.lightGrey,
          labelColor: '#999999',
          labelSize: 13,
          // currentStepLabelColor: '#999999',
        }}
        currentPosition={position}
        labels={labels}
        direction="vertical"
      />
    </View>
  );
};

export default Track;

const styles = StyleSheet.create({});
