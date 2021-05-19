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
};
