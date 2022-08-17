import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Box, HStack, Text} from 'native-base';
import {COLORS} from 'configs';
import {B2bDocument, GstComponent} from 'components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import ScrollableTabBar from '@valdio/react-native-scrollable-tabview/lib/ScrollableTabBar';

const B2BAccount = () => {
  const [changeTab, setChangeTab] = useState();
  return (
    <Box safeAreaTop flex={1} bg={COLORS.textWhite}>
      {/* <GstComponent /> */}
      <Box bg={COLORS.primary}>
        <HStack space={4} alignItems={'center'} py={3} px={5}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textWhite} />
          <Text color={COLORS.textWhite} fontSize={17} bold>
            Account Details
          </Text>
        </HStack>
      </Box>
      {/* <GstComponent />
      <B2bDocument /> */}
      <ScrollableTabView
        showsHorizontalScrollIndicator={false}
        tabBarTextStyle={{fontSize: 14}}
        tabBarActiveTextColor={COLORS.primary}
        tabBarUnderlineStyle={{
          backgroundColor: COLORS.secondary,
          height: 3,
        }}
        // renderTabBar={() => <ScrollableTabBar />}
        onChangeTab={({i}: any) => setChangeTab(i)}
        initialPage={changeTab}>
        <GstComponent tabLabel="GST" />
        <B2bDocument tabLabel="Verification" />
      </ScrollableTabView>
    </Box>
  );
};

export default B2BAccount;

const styles = StyleSheet.create({});
