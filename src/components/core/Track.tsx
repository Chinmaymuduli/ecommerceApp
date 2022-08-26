import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {COLORS} from 'configs';
import {Box, Text} from 'native-base';
import {useIsMounted} from 'hooks';

const Track = ({track}: any) => {
  const [position, setPosition] = useState(0);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (track?.status === 'INITIATED') {
      return setPosition(0);
    }
    if (track?.status === 'SHIPPED' || track?.status === 'CANCELLED') {
      return setPosition(1);
    }
    if (track?.status === 'DELIVERED') {
      return setPosition(2);
    }
  }, []);

  // const labels: any = [
  //   <Box>
  //     <Text>Ordered</Text>
  //   </Box>,
  //   <Box>
  //     <Text>Shipped</Text>
  //   </Box>,
  //   <Box>
  //     <Text>Delivered</Text>
  //   </Box>,
  // ]

  let labels: any;

  {
    track?.status === 'CANCELLED'
      ? (labels = [
          <Box>
            <Text bold>Ordered</Text>
          </Box>,
          <Box>
            <Text color={COLORS.danger} bold>
              Cancelled
            </Text>
          </Box>,
        ])
      : (labels = [
          <Box>
            <Text>Ordered</Text>
          </Box>,
          <Box>
            <Text>Shipped</Text>
          </Box>,
          <Box>
            <Text>Delivered</Text>
          </Box>,
        ]);
  }

  console.log(labels?.length);
  return (
    <View style={{height: 200, paddingLeft: 15}}>
      <StepIndicator
        stepCount={labels?.length}
        customStyles={{
          stepIndicatorSize: 10,
          separatorStrokeWidth: 3,
          currentStepIndicatorSize: 15,
          currentStepStrokeWidth: 3,
          stepStrokeCurrentColor: COLORS.primary,
          stepStrokeFinishedColor: '#fe7013',
          stepStrokeUnFinishedColor: '#fff',
          separatorFinishedColor: COLORS.primary,
          separatorUnFinishedColor: COLORS.lightGrey,
          stepIndicatorFinishedColor: COLORS.primary,
          stepIndicatorUnFinishedColor: COLORS.lightGrey,
          stepIndicatorCurrentColor: '#ffffff',
          stepIndicatorLabelCurrentColor: '#fff',
          stepIndicatorLabelFinishedColor: COLORS.primary,
          stepIndicatorLabelUnFinishedColor: COLORS.lightGrey,
          labelColor: '#999999',
          labelSize: 13,
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
