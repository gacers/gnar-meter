(function(window) {
  var currentSlide = null,
    nextSlide = null,
    rotationInvl = null,
    dataEntry,
    previouslyShownIndicies = {}, //this will store which slides we've shown of each type
    sequenceCounter = 0, //which type we are currently showing
    socket = io.connect('/'),
    firstSlideShown=false;

  for(var dataType in data) {
    previouslyShownIndicies[dataType] = []    //start with empty array for each type
    data[dataType] = shuffle(data[dataType]) //shuffle initial entry order so that we don't see the same order every day
  }

  /*allow devs to pause (spacebar)or forward(right arrow) the slides.
  Note - iframes may contain scripts that steal focus, so document may not always receive these key strokes
  */
  document.onkeydown = function(e) {
      switch (e.keyCode) {
          case 39:
        //right arrow
              showNextSlide();
              break;
          case 32:
        //spacebar
              clearInterval(rotationInvl);
              break;
          case 52:
        //4 key
              document.querySelector('.nine-screens').style.display = 'none';
              document.querySelector('.four-screens').style.display = 'block';
              break;
          case 57:
        //9 key
              document.querySelector('.four-screens').style.display = 'none';
              document.querySelector('.nine-screens').style.display = 'block';
              break;
          case 48:
        //0 key
              document.querySelector('.four-screens').style.display = 'none';
              document.querySelector('.nine-screens').style.display = 'none';
              break;
      }
  };

  function cacheSlideDivs () {
    //get the elements that hold the slides. We swap these divs around after each slide is shown, so we need to recache them
    currentSlide = document.querySelector('.currentSlide');
    nextSlide = document.querySelector('.nextSlide');
  }

  window.onload = function() {
    cacheSlideDivs();
    /*Start Slide Show*/
    showNextSlide();

    if (this.isSecondScreen) {
      socket.on('secondScreenStart', function(secondScreen) {
        console.log("got ss event", secondScreen);
        document.getElementById('secondScreenImage').src = secondScreen.url
        document.getElementById('secondScreen').style.opacity = "1";
        showingSecondScreen = true;
      });

      socket.on('secondScreenEnd', function(url) {
        console.log("got ss event", "END");
        document.getElementById('secondScreenImage').src = "";
        document.getElementById('secondScreen').style.opacity = "0";
        showingSecondScreen = false;
      });
    }
  };

  //reload every night at 4AM
  window.setInterval(function(){checkTime()}, 3600000);

  function checkTime() {
    var date = new Date();
    if(date.getHours == 4 ){
      location.reload();
    };
  };

  function determineRand(whichType) {
    return Math.floor(Math.random() * data[whichType].length);
  }

  function isInArray(array, search) {
    return array.indexOf(search) >= 0;
  }

  function shuffle(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      var index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      var temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  function transitionSlides() {
    currentSlide.classList.add('hide');
    currentSlide.addEventListener('transitionend', swapDivs);
  }

  function swapDivs() {
    currentSlide.className = "slide nextSlide";
    nextSlide.className = "slide currentSlide";
    cacheSlideDivs();
  }

  //get next type to show from the config file
  function getNextSlideType() {
    //update sequence counter
    sequenceCounter = ++sequenceCounter % contentSequence.length;
    var nextType = contentSequence[sequenceCounter];
    if (previouslyShownIndicies[nextType].length == data[nextType].length) {
      previouslyShownIndicies[nextType] = []; //start again if we've seen everything for this type
      data[dataType] = shuffle(data[dataType])
    }
    var index = 0;
    while (isInArray(previouslyShownIndicies[nextType],index) ) {
      index = determineRand(nextType);
    }
    dataEntry = data[nextType][index]
    previouslyShownIndicies[nextType].push(index)
  }

  //load the next slide into it's iframe
  var showNextSlide = function() {

    //choose next slide
    getNextSlideType();

    //makesure we can show next slide
    var now = new Date()
    if (dataEntry.scheduleDays != undefined && !dataEntry.scheduleDays.includes(now.getDay())) {
        console.log("skipping for days", dataEntry.name);
        showNextSlide();
        return;
    }
    if (dataEntry.scheduleHours != undefined && !dataEntry.scheduleHours.includes(now.getHours())) {
        console.log("skipping for hosue", dataEntry.name);
        showNextSlide();
        return;
    }

    //hide currentslide
    if (firstSlideShown) {
      transitionSlides();
    }

    // reset the clock
    clearInterval(rotationInvl);


    //second screen currently refers to the vertical screen in the lobby. When the master screen (3x3 array) comes across a module that has info for the second screen, it will emit an event to let it know
    if (dataEntry.secondScreen == true && this.isMaster ) {
      socket.emit('secondScreenStart',{url: "/slides/"+dataEntry.name+"/secondScreen.jpg"});
    } else if (this.isMaster) {
      socket.emit('secondScreenEnd');
    }

    //queue next iframe
    nextSlide.querySelector('iframe').src = "slides/" + dataEntry.name + "/index.html";

    //if this is the first time running through slides then we need to queue up the .currentSlide element first, from then on, we can continue to queue up .nextSlide
    if (!firstSlideShown) {
      swapDivs();
      firstSlideShown=true; //set this after running through the first time
    }

    //set the clock to show another slide after this slides set duration
    rotationInvl = setInterval(function() {
      showNextSlide();
    }, (dataEntry.duration * 1000) - 1.5);
  };
})(window);
