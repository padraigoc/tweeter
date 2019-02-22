
$(document).ready(function() {
  /* event listener for counting characters, this refers to the element on which the event triggered. */
  /*https://github.com/sam-meech-ward-lighthouse-labs/w03d2-JavaScript-and-Potatoes/blob/breakout/W3D2-Jquery.md*/
  
  $('#tweet_textarea').on('keydown', function(event){
    
    var cs = $(this).val().length;
    var remaining = 140 - $(tweet_textarea).val().length; /*this keyword can also be used here instead of tweet_textarea*/
    
    if(remaining > 0) {
      $(counter).css('color', 'black');
    } else {
      $(counter).css('color', 'red');
    }
    $('#counter').text(remaining);
  })
});