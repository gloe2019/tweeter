/* eslint-env jquery*/
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  loadTweets();
  $('#target').on('submit', onSubmit);

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
  const container = $('#tweets-container');
  container.empty();

  for (const tweet of tweetsArr) {
    const element = createTweetElement(tweet);
    container.prepend(element);
  }
};

const loadTweets = function() {
  $.ajax('/tweets/', {
    method: 'GET',
    success: function(response) {
      console.log('response', response);
      renderTweets(response);

    } //make this a promise!
  });
  // $.get('/tweets/')
  //   .then()
};

const onSubmit = function(event) {
  event.preventDefault();
  //Validate max tweet length;
  const counter = $('#counter'); //counter
  const tweetLength = 140 - parseInt(counter.val());
  console.log(tweetLength);
  if (tweetLength > 140) {
    alert('Tweet limit exceeded');
    return;
  }
  // Validate Tweet content
  const tweetChars = $('#tweet-text').val();
  console.log('tweetChars:', tweetChars);
  if (tweetChars === '' || tweetChars === null) {
    alert('Tweet cannot be empty!');
    return;
  }
  if (tweetChars === 'null') {
    alert('null is not a valid tweet!');
    return;
  }
  //Form submission
  // const url = $(this).attr('action');
  // $.ajax({
  //   method: 'POST',
  //   url: url,
  //   data: $(this).serialize(),
  //   success: function(data) {
  //     renderTweets(data);
  //     $('#tweets-container').html();
  //     loadTweets();
  //   },
  // });
  
  //modern way to do an jquery ajax post
  const data = $(this).serialize();
  $.post('/tweets', data)
    .then(data => {
      loadTweets();
    });
  
};