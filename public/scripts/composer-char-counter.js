//1. Forces us to not have global (window-level) variables.
//2. Decouple the html from the JS and dont assume the JS will be appended to the end of the body



$(document).ready(function() {
  /* event listener for counting characters, this refers to the element on which the event triggered. */
  /*https://github.com/sam-meech-ward-lighthouse-labs/w03d2-JavaScript-and-Potatoes/blob/breakout/W3D2-Jquery.md*/
  $('#tweet_textarea').on('keypress', function(event){ //
    var cs = $(this).val().length;
    
    var remaining = 140 - $(tweet_textarea).val().length; /*This can also be used here instead of tweet_textarea*/
    
    if(remaining > 0) {
      $(counter).css('color', 'black');
    } else {
      $(counter).css('color', 'red');
    }
    $('#counter').text(remaining);

  })

  
});



/*//localhost.8080/creatures.json
/* app.get('/creatures.json (req,res) => {
    res.send('hello');
}) */

/* app.get('/creatures.json (req,res) => {
    const creatures = [
        {
        id: 1,
        name: 'kymara',
        damage: 70,
        type: 'flying'
    }, 
    {
        id: 2,
        name: 'bigfoot',
        damage: 40,
        type: 'land'
    }];
    res.json(creatures);
}) 
*/