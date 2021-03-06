/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  // loop in to the object and append into the main
  function renderTweets(tweets) {
      tweets.forEach(posts => {
          const element = createTweetElement(posts);
          console.log(posts)
        $('main .tweets-container').prepend(element);
        $(element).bind('mouseover', function(){
          element.find('.icone').addClass('visible');
      });
      $(element).bind('mouseout', function(){
        element.find('.icone').removeClass('visible');
      });
      });
  }


  // creates html elements
  function createTweetElement(tweet) {
    // tweet content 
    const name = tweet.user.name;
    const imgValue = tweet.user.avatars.small;
    const usename = tweet.user.handle;
    const content = tweet.content.text;
    const date = new Date(tweet.created_at).toISOString().slice(0, 10);

    // create all elements
    const $tweet = $('<article>');
    const header = $('<header>');
    const tweetTextContent = $('<p>').text(content);
    const tweetFooter = $('<footer>');
    const footerTextContent = $('<p>').text(date);
    const imgContainer = $('<div>').addClass('img-tweet-container');
    const img = $('<img>').attr('src',imgValue);
    const headerTitleContainer =  $('<div>').addClass('text-header-content');
    const headerTitleTextContent = $('<h2>').text(name);
    const avatarContainer = $('<div>').addClass('avatar-name');
    const avatarTextContent = $('<strong>').text(usename);
    const iconeContainer = $('<p>').addClass('icone');

    // icones 
    const iconeFlag = $('<i>').addClass('fab fa-font-awesome-flag');
    const iconeRetweet = $('<i>').addClass('fas fa-retweet') ;
    const iconeHeart = $('<i>').addClass('fas fa-heart');
    // append all elements 
   
    imgContainer
        .append(img);
    
      iconeContainer
        .append(iconeFlag)
        .append(iconeRetweet)
        .append(iconeHeart);

    headerTitleContainer
        .append(headerTitleTextContent);

    avatarContainer
        .append(avatarTextContent);
    
    // append elements to header 
    header
        .append(imgContainer)
        .append(headerTitleContainer)
        .append(avatarContainer);

    // append element in footer 
    tweetFooter
        .append(footerTextContent)
        .append(iconeContainer);
    

    // append all element in tweet container
    $tweet
        .append(header)
        .append(tweetTextContent)
        .append(tweetFooter);
    // return the element constructed  " tweet html box "
    return $tweet;
  }

  function loadTweets(){
    $.ajax('/tweets',{method:'GET'})
    .then(result => renderTweets(result))
  };

  $(document).ready(function(){

    // nav button on click handler
    $('#compose').on('click', function(){
      $('.new-tweet').slideToggle(500);
      const input = document.querySelector('textarea');
      input.select();
    });

    // When form is submited
    $('form').on('submit', function(e){
      e.preventDefault();
      const formData = $(e.target).find('textarea').val();
      // checking if data is not empty or greater then 140
      if(formData === '' || formData === null){
        $('#showerror').text('please enter something in the form');
        return
      }
      if(formData.length > 140){
        $('#showerror').text('your tweet is greater then 140');
        return
      }else{
         // post data to db 
          $.ajax({ method: 'POST', url: '/tweets', data:{text:formData}})
            .done(data => loadTweets());
          document.querySelector('form').reset();
          $('#showerror').text('');
      }
    });
    loadTweets();

    });