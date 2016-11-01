$(document).ready(function () {
  mySaves = [];
  corgiCount = 0;
  beyonceCount = 0;
  function addCounter(){
    $.get(chrome.extension.getURL('templates/counter.html'), function (data) {
      $("#globalContainer").append(data);
      var imgURL = chrome.extension.getURL("images/corgi.png");
      console.log("imgURL:", imgURL)
      document.getElementById("corgiPic").src = imgURL;
      imgURL = chrome.extension.getURL("images/bee.png");
      console.log("imgURL:", imgURL)
      document.getElementById("beyPic").src = imgURL;
    });
    // var image = $('#corgiPic');
    // console.log("image: ", image)
    // image.src = chrome.extension.getURL("images/corgi.jpg");

  }

  function addGif (e, div){
    var gifArray;
    var gifType;
    var min = 0;
    var max = 1;
    var picker = Math.floor(Math.random() * (max - min + 1)) + min;

    switch(picker){
      case 0:
        gifArray = beyonceGifs;
        gifType = "beyonce";
        beyonceCount+=1
        $("#beyonceCount").text(beyonceCount);
        break;
      case 1:
        gifArray = corgiGifs;
        gifType = "corgi"
        corgiCount+=1
        $("#corgiCount").text(corgiCount);
        break;
    }
    console.log("Gifs left: ", gifArray.length);
    if (!gifArray.length){ loadGifs(gifType)};
    myGif =  gifArray.pop()
    $(e).find(div).replaceWith( "<img class='gif' src="+myGif+" />" );
  };

  function addText(e){
    $(e).find('div.userContent').replaceWith("<h1>MUCH BETTER</h1>")
  }

  function replaceElection(){

    $('div.userContentWrapper').each(function(i,e){
      var fullText = $(e).text();
      timestmp = $(e).find('span.timestampContent')
      var timestmpText;
      if (timestmp.length>0){ timestmpText = timestmp.text()};

      var electionTest = new RegExp(/Clinton|Trump|Donald|Hillary|Election|Democrat|Republican|Debate|President|Pence|Kaine|VP/i);
      var isElection = electionTest.test(fullText);
      if (isElection) {
        if ($(e).find('div.mtm').length > 0){
          addText(e)
          addGif(e , 'div.mtm');
        } else {
          addGif(e, 'div.userContent')
        }

        $(e).find('a').each(function(i, e){
           if (e) {
             var text = $(e).text()
             if (mySaves.indexOf(text+"-"+timestmpText) > -1 ){
               var href = $(e).attr('href');
               var isFB = new RegExp("facebook.com/");
               var notTimeStmp =  new RegExp(":|^\d|Yesterday/");

               var fbLinkTest = isFB.test(href);
               var timeStmpTest = notTimeStmp.test(text);

               if (fbLinkTest && !timeStmpTest && text.length>0){
                 mySaves.push($(e).text() +"-" +  timestmpText)
                 //console.log("mysaves is now: ", mySaves)
                 //$(e).text("I AM NEW")
               }
             }
         }
        });
    }
    });
  };

  var initHeight = 0;
  $(window).scroll(function() {
      var height = $(window).scrollTop();
      //console.log("the height is now: ", height)
      if( (height-initHeight) > 500) {
          initHeight = height
          replaceElection();
      }
  });
  addCounter()
  replaceElection();
});
