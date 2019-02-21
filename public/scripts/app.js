/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    $('#error-text').hide();
    $('#error-140').hide();

    const createTweetElement = function (tweetObj) {
        /*retrieve the form information*/
        const element = `<article>
      
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
        <p>${renderDate(tweetObj.created_at)}</p>               
        </footer>
        </article>
        <br>`;
        //create a var for list container holding tweets
        const $listOfTweets = $('.tweetcontainer');
        //add the tweets //keyword here is prepend  
        $listOfTweets.prepend(element);
        return element;
    }

    function renderDate(val){
    var d = new Date(val);
    return d; 
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


    //create tweet
    var $button = $('#sendTweet');
    $button.on('click', function (event) {
        console.log('Button clicked, performing ajax call...');
        event.preventDefault();
        //use jquery for text area and .val() get.length 

      const len = $('#tweet_textarea').val().length;

      if(len == "" || null) {
        $('#error-text').fadeIn();
      }
      else if(len > 140){
        $('#error-140').fadeIn();
      } else {
        $.ajax({
                method: "POST",
                url: "/tweets",
                data: $('#new-tweet-form').serialize()
            })
            .done(function (loadTweets) {
                console.log('Success: ', loadTweets);
                $('#error-text').fadeOut();
            $('#error-140').fadeOut();
            $('#tweet_textarea').val(""); 
            })
            loadTweets()
        }
    });

});