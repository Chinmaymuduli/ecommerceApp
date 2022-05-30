import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Box} from 'native-base';
import {CategoryButtom} from 'components/core';
import {CATEGORYARR} from '../../constants';

const Category = () => {
  const [tabValue, setTabValue] = useState(1);
  const onSelectSwitch = useCallback((value: React.SetStateAction<number>) => {
    setTabValue(value);
  }, []);
  return (
    <Box>
      <CategoryButtom
        selectionMode={1}
        onSelectSwitch={onSelectSwitch}
        data={CATEGORYARR}
      />
    </Box>
  );
};

export default Category;

const styles = StyleSheet.create({});
