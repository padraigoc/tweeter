/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    const createTweetElement = function (tweetObj) {
        /*retrieve the form information*/
        const element = `<article>
        <br>
        <header>
        <img id="avatar" src="/images/avatar.png">
        <div id="name">   ${tweetObj.user.name}
        <span style="float:right; font-size: 15px; font-weight: normal; padding-top: 10px; margin-right: 10px;"> ${tweetObj.user.handle} </span>             
        </div>                      
        <br> 
        <br>
        <br>           
        </header>
        <p>
        ${tweetObj.content.text}
        </p>
        <footer>
        <p>${tweetObj.createdat}</p>               
        </footer>
        </article>`;
        //create a var for list container holding tweets
        const $listOfTweets = $('.tweetcontainer');
        //add the tweets //keyword here is append 
        $listOfTweets.prepend(element);
        //return the tweet object
        return element;
    }


    function renderTweets(tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        for (var key in tweets) {
            createTweetElement(tweets[key]);
        }
        return tweets[key];
    }



    //load tweets
    function loadTweets() {
        //fetching tweets from the http://localhost:8080/tweets page. 

        $.ajax({
                method: "GET",
                url: "/tweets",
            })
            .done(function (tweets) {

                const $listOfTweets = $('.tweetcontainer');
                $listOfTweets.empty(); 
                renderTweets(tweets);

            })


    }

    loadTweets()

    //Event Handler 
    var $button = $('#sendTweet');
    $button.on('click', function (event) {
        console.log('Button clicked, performing ajax call...');
        event.preventDefault();
        //use jquery for text area and .val() get.length 

      const len = $('#tweet_textarea').val().length;


      if(len == "" || null) {
        alert("Please enter a message");
      }
      else if(len > 140){
          alert("Please enter 140 characters or less");
      } else {
        $.ajax({
                method: "POST",
                url: "/tweets",
                data: $('#new-tweet-form').serialize()
            })
            .done(function (loadTweets) {
                console.log('Success: ', loadTweets);
            })
        }
        loadTweets()
        $('#tweet_textarea').val("");
    
    });

});