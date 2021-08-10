/* eslint-env jquery*/
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const target = $('#target');
  target.on('submit', function(event) {
    event.preventDefault();
    // console.log($(this));
    const url = $(this).attr('action');
    $.ajax({
      method: 'POST',
      url: url,
      data: $(this).serialize(),
      success: function(data) {
        console.log(data);
      },
    });
  });

  const loadTweets = function() {
    $.ajax('/tweets/', {
      method: 'GET',
      success: function(response) {
        console.log('response', response);
        renderTweets(response);
      }
    });
  };

  loadTweets();
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
