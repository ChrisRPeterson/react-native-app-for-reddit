import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Linking,
  Button,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import Comment from './Comment';

const PostScreen = ({currentPost, setCurrentPost}) => {
  const [comments, setComments] = useState(null);
  const handlePress = () => {
    setCurrentPost(null);
  };

  useEffect(() => {
    const url = `https://reddit.com/r/${currentPost.subreddit}/comments/${currentPost.id}.json`;
    fetch(url, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setComments(data[1].data.children);
      });
  }, [currentPost]);

  console.log(currentPost.url);
  return (
    <View style={styles.header}>
      <Button onPress={handlePress} title="Back" />
      <Text style={styles.text}>{currentPost.title}</Text>
      <Text
        onPress={() => Linking.openURL(currentPost.url)}
        style={styles.link}>
        Open in browser
      </Text>
      {currentPost.post_hint === 'image' ? (
        <Image style={styles.image} source={{uri: currentPost.url}} />
      ) : null}
      <Text>Comments</Text>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <Comment
            comment={item.data}
            handlePress={handlePress}
            setCurrentPost={setCurrentPost}
            id={item.data.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
  text: {
    fontSize: 20,
  },
});

export default PostScreen;
