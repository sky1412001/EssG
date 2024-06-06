import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import COLORS from './COLORS';

const Dropdown = ({ options, onSelect,placeholder,}) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (item) => {
    setSelectedOption(item);
    onSelect(item);
    setShowOptions(false);
    setQuery(item.label);
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Text style={styles.option}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {showOptions && (
        <FlatList
          data={options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()))}
          renderItem={renderOption}
          keyExtractor={item => item.value.toString()}
          style={styles.optionList}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputControl}
          value={query}
          onChangeText={text => setQuery(text)}
          onFocus={() => setShowOptions(true)}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
        />
        <Icon.Button
          name="globe"
          size={36}
          color={COLORS.primary}
          backgroundColor="transparent"
          onPress={() => setShowOptions(!showOptions)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8ecf4',
    borderRadius: 10,
  },
  inputControl: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#6b7280',
  },
  optionList: {
    marginTop: 5,
    maxHeight: 290,
    borderRadius: 10,
    width:'100%',
    backgroundColor:COLORS.primary,
    alignSelf:"center",
    borderWidth:0 
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    color:'white',
    fontFamily:"Poppins-Regular"
  },
});

export default Dropdown;
