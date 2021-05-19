import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Nomad for Reddit</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    padding: 15,
    backgroundColor: 'tomato',
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default Header;
