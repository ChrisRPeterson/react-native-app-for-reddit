import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Comment = comment => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.author}>{comment.comment.author}</Text>
        <Text style={styles.text}>{comment.comment.body}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 14,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  author: {
    fontWeight: 'bold',
  },
});

export default Comment;
