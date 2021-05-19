import React, {useEffect, useState, useContext} from 'react';
import {View, Button, StyleSheet, FlatList} from 'react-native';

import ListItem from './ListItem';
import Search from './Search';
import API from '../utils/API';
import {CurrentPostContext} from '../contexts/CurrentPostContext';
import {UserContext} from '../contexts/UserContext';

const HomeScreen = ({navigation}) => {
  const [subredditQuery, setSubredditQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const {setCurrentPost} = useContext(CurrentPostContext);

  const handlePress = post => {
    setCurrentPost(post);
    navigation.navigate('Post Details');
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

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Login')} title="Login" />
      <Search
        setSubredditQuery={setSubredditQuery}
        subredditQuery={subredditQuery}
        handleSubmission={handleSubmission}
      />
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <ListItem post={item.data} handlePress={handlePress} />
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

export default HomeScreen;
