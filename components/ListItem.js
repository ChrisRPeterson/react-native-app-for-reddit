import React, {useState, useContext} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import kconvert from 'k-convert';

import timeAgo from '../utils/time-ago';
import API from '../utils/API';
import {UserContext} from '../contexts/UserContext';

const ListItem = ({post, handlePress}) => {
  const {accessToken} = useContext(UserContext);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  let upvoteColor = '#424242';
  let downvoteColor = '#424242';

  if (upvoted) {
    upvoteColor = '#FF8b60';
  }

  if (downvoted) {
    downvoteColor = '#9494FF';
  }

  const handleUpvote = () => {
    if (!upvoted) {
      setUpvoted(true);
      setDownvoted(false);
      API.vote(1, post.name, accessToken);
    } else {
      setUpvoted(false);
      API.vote(0, post.name, accessToken);
    }
  };

  const handleDownvote = () => {
    if (!downvoted) {
      setDownvoted(true);
      setUpvoted(false);
      API.vote(-1, post.name, accessToken);
    } else {
      setDownvoted(false);
      API.vote(0, post.name, accessToken);
    }
  };

  return (
    <TouchableOpacity style={styles.listItem} onPress={() => handlePress(post)}>
      <View style={styles.listItemView}>
        <Text style={styles.subreddit}>r/{post.subreddit}</Text>
        <Text style={styles.author}>
          Posted by u/{post.author}
          {' • '}
          {timeAgo.format(new Date(post.created_utc * 1000), 'mini')}
        </Text>
        <Text style={styles.listItemText}>{post.title}</Text>
        {post.post_hint === 'image' ? (
          <Image style={styles.image} source={{uri: post.url}} />
        ) : null}
        <View style={styles.bottomBar}>
          <View style={styles.thumbsContainer}>
            <TouchableOpacity
              onPress={() => {
                handleUpvote();
              }}>
              <Icon name="thumbs-up" size={20} color={upvoteColor} />
            </TouchableOpacity>
            <Text style={styles.smallPadding}>
              {kconvert.convertTo(post.ups)}
            </Text>
            <TouchableOpacity onPress={() => handleDownvote()}>
              <Icon name="thumbs-down" size={20} color={downvoteColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.commentsContainer}>
            <Icon name="comment" size={20} color="#424242" />
            <Text style={styles.smallPadding}>{post.num_comments}</Text>
          </View>
          <View style={styles.shareContainer}>
            <Icon name="share-alt" size={20} color="#424242" />
            <Text style={styles.smallPadding}>Share</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  author: {
    color: '#424242',
    paddingBottom: 10,
  },
  bottomBar: {
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentsContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 370,
    width: '100%',
    paddingBottom: 14,
    resizeMode: 'contain',
  },
  listItem: {
    padding: 14,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  listItemText: {
    fontSize: 18,
    paddingBottom: 14,
  },
  listItemView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    height: 'auto',
  },
  shareContainer: {
    flexDirection: 'row',
  },
  smallPadding: {
    color: '#424242',
    paddingLeft: 10,
    paddingRight: 10,
  },
  subreddit: {
    fontWeight: 'bold',
  },
  thumbsContainer: {
    flexDirection: 'row',
  },
});

export default ListItem;
