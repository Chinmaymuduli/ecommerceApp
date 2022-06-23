import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Box} from 'native-base';

const Accordion = ({title, subtitle}: any) => {
  const [open, setOpen] = useState(true);

  const toggleExpand = () => {
    setOpen(!open);
  };
  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={toggleExpand}>
        <Text style={styles.title}>{title}</Text>
        <Box
          bg={'#90EE9060'}
          borderRadius={30}
          alignItems={'center'}
          justifyContent={'center'}>
          <Icon
            name={open ? 'chevron-down-outline' : 'chevron-forward'}
            size={20}
            color="#000"
            style={{
              padding: 2,
            }}
          />
        </Box>
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {open && (
        <View style={styles.child}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,

    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
  },
  parentHr: {
    height: 1,
    color: '#fff',
    width: '100%',
  },
  child: {
    // padding: 16,
  },
  subtitle: {
    textAlign: 'justify',
    fontFamily: 'Nunito-Regular',
  },
});
