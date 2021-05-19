export default {
  getFrontPage: () => {
    return new Promise((resolve, reject) => {
      fetch('https://reddit.com/best.json', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
          resolve(data.data.children);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getBestOfSubreddit: subreddit => {
    return new Promise((resolve, reject) => {
      fetch(`https://reddit.com/r/${subreddit}.json`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
          resolve(data.data.children);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getAccessToken: () => {
    return new Promise((resolve, reject) => {
      fetch('http://52.14.170.19:3000/access', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
          console.log(data.access_token);
          resolve(data.access_token);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  vote: (dir, id, token) => {
    return new Promise((resolve, reject) => {
      fetch(`https://oauth.reddit.com/api/vote?dir=${dir}&id=${id}&rank=2`, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        // .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.error(err);
        });
    });
  },
  testToken: token => {
    return new Promise((resolve, reject) => {
      fetch('https://oauth.reddit.com/api/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
