import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from './COLORS';

const Dropdown = ({ options, onSelect, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (item) => {
    setSelectedOption(item);
    onSelect(item);
    setShowOptions(false);
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Text style={styles.option}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={[styles.inputControl, !selectedOption && styles.placeholder]}>{selectedOption ? selectedOption.label : placeholder}</Text>
        <Icon name={showOptions ? 'angle-up' : 'angle-down'} size={20} color="#6b7280" />
      </TouchableOpacity>
      {showOptions && (
        <FlatList
          data={options}
          renderItem={renderOption}
          keyExtractor={item => item.value.toString()}
          style={[styles.optionList, { maxHeight: hp('30%') }]} // Set max height responsively
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10,
    borderWidth: 1,
    fontSize:15, height:50
  },
  inputControl: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#6b7280',
  },
  placeholder: {
    color: '#6b7280',
    fontFamily:"Prompt-Medium"
  },
  optionList: {
    marginTop: 5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    borderWidth: 0,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: 'white',
    fontFamily: "Poppins-Regular"
  },
});

export default Dropdown;
