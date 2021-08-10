$(document).ready(function() {
  // --- our code goes here ---
  //id to target: tweet-text
  console.log('I\'m ready!');
  
  $('#tweet-text').on('input', function(event) {
    // console.log(this);
    // console.log($(this).val().length);
    let max = 140;
    let actChars = $(this).val().length;
    // console.log(actChars, 'used', (max - actChars), 'left');
    $(this).parents().find('.counter').text(max - actChars);
    // counter.text(actChars);
    if (actChars > max) {
      $('.counter').css("color", "red");
    }

  });
});
