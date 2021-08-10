$(document).ready(function() {
  
  $('#tweet-text').on('input', onInput);
});

const onInput = function(event) {
  let max = 140;
  let actChars = $(this).val().length;
 
  $(this).parents().find('.counter').text(max - actChars);


  if (actChars > max) {
    $('.counter').addClass('danger'); //add class once
    return;
  }
  
  $('.counter').removeClass('danger'); // remove class once if statement is falsy...
  
};