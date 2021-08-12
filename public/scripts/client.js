/* eslint-env jquery*/
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    <div class='tweet-body'>${escape(tweetObj.content.text)}</div>
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

    } //you can make this a promise!
  });
  // $.get('/tweets/')
  //   .then()
};

const onSubmit = function(event) {
  event.preventDefault();
  //Validate max tweet length;
  $('#error-message').hide();
  const counter = $('#counter'); //counter
  const tweetLength = 140 - parseInt(counter.val());
  console.log(tweetLength);
  if (tweetLength > 140) {
    $('#error-message').find('.error-text').text('Tweet limit exceeded');
    $('#error-message').slideDown('slow');
    return;
  }
  // Validate Tweet content
  const tweetChars = $('#tweet-text').val();
  console.log('tweetChars:', tweetChars);
  if (tweetChars === '' || tweetChars === null) {
    $('#error-message').find('.error-text').text('Maybe try writing something first...');
    $('#error-message').slideDown('slow');
    return;
  }
  if (tweetChars === 'null') {
    $('#error-message').find('.error-text').text('null is not a valid tweet');
    $('#error-message').slideDown('slow');
    return;
  }
   
  //modern way to do an jquery ajax post
  const data = $(this).serialize();
  $.post('/tweets', data)
    .then(data => {
      $("#tweet-text").val('');
      loadTweets();
    });
  
};

const showHideTweet = function() {
  if ($('.new-tweet').is(':visible')) {
    $('.new-tweet').slideUp('slow');
  } else {
    $('.new-tweet').slideDown('slow');
    $('#tweet-text').focus();
  }
};

const backToTop = function() {
  window.scrollTo(0,0);
  $('.new-tweet').slideDown('slow');
  $('#tweet-text').focus();
};

const onScroll = function() {
  if ($(this).scrollTop() > 100) {
    $('.nav-tweet').hide();
    $('#back-up-btn').show();
  } else {
    $('.nav-tweet').show();
    $('#back-up-btn').hide();
  }
};

$(document).ready(function() {
  $('#tweet-form').on('submit', onSubmit);
  $('#error-message').hide();
  $('.new-tweet').hide();
  $('#back-up-btn').hide();
  loadTweets();
  $('#tweet-button').on('click', showHideTweet);
  $(window).on('scroll', onScroll);
  $('#back-up-btn').on('click', backToTop);
});