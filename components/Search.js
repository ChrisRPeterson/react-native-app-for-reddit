import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Search = ({setSubredditQuery, subredditQuery, handleSubmission}) => {
  return (
    <TextInput
      style={styles.searchField}
      onChangeText={setSubredditQuery}
      value={subredditQuery}
      placeholder=" Search"
      onSubmitEditing={handleSubmission}
    />
  );
};

const styles = StyleSheet.create({
  searchField: {
    borderColor: '#121212',
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    margin: 10,
  },
});

export default Search;
