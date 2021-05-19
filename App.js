import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import PostScreen from './components/PostScreen';
import LoginScreen from './components/LoginScreen';
import API from './utils/API';
import {CurrentPostContext} from './contexts/CurrentPostContext';
import {UserContext} from './contexts/UserContext';

const Stack = createStackNavigator();

const App = () => {
  const [subredditQuery, setSubredditQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

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

  return (
    <NavigationContainer>
      <CurrentPostContext.Provider value={{currentPost, setCurrentPost}}>
        <UserContext.Provider
          value={{loggedIn, setLoggedIn, accessToken, setAccessToken}}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Post Details" component={PostScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </UserContext.Provider>
      </CurrentPostContext.Provider>
    </NavigationContainer>
  );
};

export default App;
