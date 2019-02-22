/*
 * Client-side JS logic
 */
 $(document).ready(function () {

     

    //remove all error messaging when page loads
     $('#error-text').hide();
     $('#error-140').hide();

     
     //creates tweet element 
     const createTweetElement = function (tweetObj) {
        
        const element = 
     
        `<article>
            <header>
                    <img id="avatar" src="${tweetObj.user.avatars.regular}">
                    <div id="name">   ${tweetObj.user.name}
                            <span id="username"> ${tweetObj.user.handle} </span>
                    </div>                      
                    <br> 
                    <br>
                    <br>           
            </header>
            <p id="tweet">
               ${tweetObj.content.text}
            </p>
            <footer>
            <div class="hoverimage">
            <span>
            <a href="#"><img class="icons" src="images/message.png" alt="image" height="100" /> </a>
            <a href="#"><img class="icons" src="images/star.png" alt="image" height="100" />  </a>   
            <a href="#"><img class="icons" src="images/retweet.png" alt="image" height="100" /> </a>
            </span>
            </div>   
            <p>${timeSince(tweetObj.created_at)}</p>   
                            
            </footer>
        </article>
        <br>`;

        //ist container to hold tweets
        const $listOfTweets = $('.tweetcontainer');

        //prepend tweets to newest returns first
        $listOfTweets.prepend(element);
        return element;
    }
    
    // function to convert date 
    function renderDate(val){
    var now = new Date();
    var d = new Date(val);

    return d; 
    }


    /* https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best */
    function timeSince(timeStamp) {

        let d = renderDate(timeStamp);
        var now = new Date(),
          secondsPast = (now.getTime() - d.getTime()) / 1000;
        if(secondsPast < 60){
          return parseInt(secondsPast) + ' seconds ago..';
        }
        if(secondsPast < 3600){
          return parseInt(secondsPast/60) + ' minutes ago';
        }
        if(secondsPast <= 86400){
          return parseInt(secondsPast/3600) + ' hours ago';
        }
        if(secondsPast > 86400){
            day = d.getDate();
            month = d.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
            year = d.getFullYear() == now.getFullYear() ? "" :  " "+d.getFullYear();
            return day + " " + month + year;
        }
      }



    
    // Returns all tweets
    function renderTweets(tweets) {
        for (var key in tweets) {
            createTweetElement(tweets[key]);
        }
        return tweets[key];
    }

    //load tweets
    function loadTweets() {
        //fetching tweets from the server 
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

    //calling method so tweets loads when page loads
    loadTweets()

    //create tweet
    var $button = $('#sendTweet');
    $button.on('click', function (event) {
        console.log('Button clicked, performing ajax call...');
        event.preventDefault();
        
        const len = $('#tweet_textarea').val().length;
        
        if(len == "" || null) {
            $('#error-text').fadeIn();
        }
        else if(len > 140){
            $('#error-text').hide();
            $('#error-140').fadeIn();
        } else {
            $.ajax({
                method: "POST",
                url: "/tweets",
                data: $('#new-tweet-form').serialize()
            })
            .done(function (response) {
                console.log('Success: ', response);
                $('#error-text').fadeOut();
            $('#error-140').fadeOut();
            $('#tweet_textarea').val(""); 
            loadTweets()
            $('#counter').text("140"); //reset character count
            })
            
        }
    });


    // document.getElementById("composecontainer").style.visibility = "hidden"; 


    //Compose button which fades in/out compose message box

        $('.composecontainer').hide(); //hide compose box on load 
        $(".composecontainer").daf
        $("#compose-button").click(function(){
          $(".composecontainer").fadeToggle() //fadeout
           $('#tweet_textarea').focus()
        });
     

  

});