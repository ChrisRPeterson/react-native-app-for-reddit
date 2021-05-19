import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';

import Header from './components/Header';
import ListItem from './components/ListItem';
import PostScreen from './components/PostScreen';
import Search from './components/Search';
import API from './utils/API';

const App = () => {
  const [subredditQuery, setSubredditQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const handlePress = post => {
    setCurrentPost(post);
  };

  const handleSubmission = async () => {
    if (subredditQuery === '') {
      const response = await API.getFrontPage();
      setPosts(response);
    } else {
      const response = await API.getBestOfSubreddit(subredditQuery);
      setPosts(response);
      setSubredditQuery('');
    }
  };

  useEffect(() => {
    const callGetFrontPage = async () => {
      const response = await API.getFrontPage();
      setPosts(response);
    };
    callGetFrontPage();
  }, []);

  return currentPost ? (
    <PostScreen currentPost={currentPost} setCurrentPost={setCurrentPost} />
  ) : (
    <View style={styles.container}>
      <Header />
      <Search
        setSubredditQuery={setSubredditQuery}
        subredditQuery={subredditQuery}
        handleSubmission={handleSubmission}
      />
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <ListItem
            post={item.data}
            handlePress={handlePress}
            setCurrentPost={setCurrentPost}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
