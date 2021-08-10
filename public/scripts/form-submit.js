/* eslint-env jquery*/
$(document).ready(() => {
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
});
