/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461119232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(function() {
renderTweets(data);
});

const createTweetElement = (tweetObj) => {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class='avi'>
        <img src='${tweetObj.user.avatars}'></img>
        <div class='username'>${tweetObj.user.name}</div>
      </div>
      <div class='handle'>${tweetObj.user.handle}</div>
    </header>
    <div class='tweet-body'>${tweetObj.content.text}</div>
    <footer>
      <div class='tweet-date'>${timeago.format(tweetObj['created_at'])}</div>
      <div class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
`);
  return $tweet;
};

const renderTweets = (tweetsArr) => {
  for (const tweet of tweetsArr) {
    const element = createTweetElement(tweet);
    $('#tweets-container').prepend(element);
  }
};