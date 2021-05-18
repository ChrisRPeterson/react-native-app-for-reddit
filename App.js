import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import PostScreen from './components/PostScreen';

const CLIENT_ID = 'dRoUjIpIATA1KA';
const SECRET_KEY = 'hNlawHgOYjsVLVv8RdeNdgWy_pDODQ';

const App = () => {
  const [text, onChangeText] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const handlePress = post => {
    setCurrentPost(post);
  };

  const handleSubmission = () => {
    if (text === '') {
      fetch('https://reddit.com/best.json', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
          setPosts(data.data.children);
        });
    } else {
      fetch(`https://reddit.com/r/${text}.json`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
          setPosts(data.data.children);
        });
      onChangeText('');
    }
  };

  useEffect(() => {
    fetch('https://reddit.com/best.json', {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setPosts(data.data.children);
      });
  }, []);

  return currentPost ? (
    <PostScreen currentPost={currentPost} setCurrentPost={setCurrentPost} />
  ) : (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={styles.searchField}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search"
        onSubmitEditing={handleSubmission}
      />
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <ListItem
            post={item.data}
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
  container: {
    flex: 1,
  },
  searchField: {
    borderColor: '#121212',
    // borderWidth: 2,
    backgroundColor: '#d3d3d3',
  },
});

export default App;
