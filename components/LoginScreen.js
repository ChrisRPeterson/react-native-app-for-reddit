import React, {useState, useContext} from 'react';
import {TextInput, Button, View, Text, StyleSheet, Linking} from 'react-native';

import {UserContext} from '../contexts/UserContext';
import API from '../utils/API';

function LoginScreen() {
  const {setLoggedIn, setAccessToken, accessToken} = useContext(UserContext);
  const [testResponse, setTestResponse] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text>Check if your token is expired</Text>
        <Button
          title="Test Token"
          onPress={async () => {
            console.log({accessToken});
            const response = await API.testToken(accessToken);
            if (response.name) {
              setTestResponse(
                `Success! You are logged in as u/${response.name}`,
              );
            } else {
              setTestResponse(
                "Your token isn't valid, try reconnecting or doing first-time setup",
              );
            }
          }}
          color="#5f99cf"
        />
        <Text>{testResponse}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text>Already connected?</Text>
        <Button
          title="Reconnect to Reddit"
          onPress={async () => {
            const response = await API.getAccessToken();
            setAccessToken(response);
            setLoggedIn(true);
          }}
          color="#5f99cf"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text>Never connected before?</Text>
        <Button
          onPress={() =>
            Linking.openURL(
              'https://www.reddit.com/api/v1/authorize?client_id=soX6EClIb3nDAQ&response_type=code&state=meow&redirect_uri=http://52.14.170.19:3000&duration=temporary&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote,wikiedit,wikiread',
            )
          }
          title="First-time setup"
          color="#ff4500"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 14,
  },
  container: {
    flex: 1,
  },
});

export default LoginScreen;
