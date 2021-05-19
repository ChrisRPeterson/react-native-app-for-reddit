import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Linking,
  Button,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import timeAgo from '../utils/time-ago';

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
    <ScrollView>
      <View style={styles.container}>
        <Button onPress={handlePress} title="Back" />
        {currentPost.post_hint === 'image' ? (
          <Image style={styles.image} source={{uri: currentPost.url}} />
        ) : null}
        <View style={styles.infoContainer}>
          <Text style={styles.subreddit}>r/{currentPost.subreddit}</Text>
          <Text style={styles.author}>
            Posted by u/{currentPost.author}
            {' • '}
            {timeAgo.format(new Date(currentPost.created_utc * 1000), 'mini')}
          </Text>
          <Text style={styles.text}>{currentPost.title}</Text>
          <Text
            onPress={() => Linking.openURL(currentPost.url)}
            style={styles.link}>
            Open in browser <Icon name="external-link" />
          </Text>
        </View>
        <Text style={styles.commentsHeader}>Comments</Text>
        {/* {comments
          ? comments.map(comment => {
              <Comment
                comment={comment.data}
                handlePress={handlePress}
                setCurrentPost={setCurrentPost}
                id={comment.data.id}
              />;
            })
          : null} */}
        <FlatList
          data={comments}
          renderItem={({item}) => (
            <Comment
              comment={item.data}
              handlePress={handlePress}
              setCurrentPost={setCurrentPost}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 14,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  infoContainer: {
    padding: 14,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  image: {
    marginTop: 14,
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
  },
  subreddit: {
    fontWeight: 'bold',
  },
  author: {
    color: '#424242',
    paddingBottom: 10,
  },
  commentsHeader: {
    padding: 14,
    fontSize: 18,
  },
});

export default PostScreen;
