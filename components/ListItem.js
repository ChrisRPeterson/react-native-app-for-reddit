import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({post, handlePress}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => handlePress(post)}>
      <View style={styles.listItemView}>
        <Text style={styles.subreddit}>r/{post.subreddit}</Text>
        <Text style={styles.author}>Posted by u/{post.author}</Text>
        <Text style={styles.listItemText}>{post.title}</Text>
        {post.post_hint === 'image' ? (
          <Image style={styles.image} source={{uri: post.url}} />
        ) : null}
        <View style={styles.bottomBar}>
          <Icon name="thumbs-up" size={20} color="#424242" />
          <Icon name="thumbs-down" size={20} color="#424242" />
          <Icon name="comment" size={20} color="#424242" />
          <Icon name="share-alt" size={20} color="#424242" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 14,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    height: 'auto',
  },
  bottomBar: {
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listItemText: {
    fontSize: 18,
    paddingBottom: 14,
  },
  image: {
    height: 370,
    width: 370,
    paddingBottom: 14,
    resizeMode: 'contain',
  },
  subreddit: {
    fontWeight: 'bold',
  },
  author: {
    color: '#424242',
    paddingBottom: 10,
  },
});

export default ListItem;
