jQuery(document).ready(function($) {

  var days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
  var now = new Date();
  var today = now.getDay();
  console.log(days[today]);

  var d = new Date();
  var n = d.getHours();
  console.log(n);

  console.log('hello');

  // bacton 1398 // 110 mile 118
  //var url = 'http://magicseaweed.com/api/e09cd1c1b299437bce992b12b4f69800/forecast/?spot_id=118';
  // Just the stuff I need.
  var url = 'http://magicseaweed.com/api/e09cd1c1b299437bce992b12b4f69800/forecast/?spot_id=118&fields=localTimestamp,swell.*,fadedRating,solidRating';

  $.ajax({
    dataType: "jsonp",
    url: url
  }).done(function(forecast) {
    console.log(forecast);
    // The result is an array, so loop over each one.
    $.each(forecast, function() {
      // Do something with the item, e.g:
      var diff = this.swell.maxBreakingHeight - this.swell.minBreakingHeight;
      console.log('The swell diff is' + ' ' + diff);
      // Lets print out the rating with the time.
      var rating = this.fadedRating;
      var theTime = this.localTimestamp;
      //convert theTime to hhmmss.
      //var months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
      var jsDate = new Date(theTime * 1000);
      if (rating === 0) {
        rating = 'No Surf';
      } else {
        rating = "Surfs Up";
      }
      console.log("The rating at " + jsDate + " is " + rating);
    });

    var rating = [];

    // Loop the solid rating on a single forecast object.
    for (var i = 0; i < forecast.solidRating; i++) {
      rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
    }
    // Loop the faded rating on a single forecast object.
    for (var i = 0; i < forecast.fadedRating; i++) {
      rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');
    }
    //document.getElementById("ratingContainer").innerHTML = rating.join(" ");


    var d = new Date();
    var n = d.getHours();
    var theSlot = 0;

    if (n <= 3) {
      theSlot = 0;
    } else if (n > 2 && n <= 6) {
      theSlot = 1;
    } else if (n > 5 && n <= 8) {
      theSlot = 2;
    } else if (n > 8 && n <= 11) {
      theSlot = 3;
    } else if (n > 11 && n <= 14) {
      theSlot = 4;
    } else if (n > 14 && n <= 17) {
      theSlot = 5;
    } else if (n > 17 && n <= 20) {
      theSlot = 6;
    } else if (n > 20) {
      theSlot = 7;
    }


    console.log('The slot is ' + theSlot);
    var surfSpot = '100 Mile Beach';

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var now = new Date(forecast[0].localTimestamp * 1000);
    var today = now.getDay();

    // This logs last night
    var theTimeNow = new Date(forecast[theSlot].localTimestamp * 1000);
    var shouldYouSurf = forecast[theSlot].fadedRating;
    if (shouldYouSurf === 0) {
      shouldYouSurf = 'No Surf';
    } else {
      shouldYouSurf = 'Surfs Up';
    }

    isThereSurf(days[today], shouldYouSurf, surfSpot);

    //console.log(shouldYouSurf + ' ' + theTimeNow);
    console.log(days[today] + ' ' + 'there is ' + shouldYouSurf + ' ' + 'at' + ' ' + surfSpot);

  });

  // The message function.
  var isThereSurf = function(theDay, theMessage, theLocation) {
    $('#the-message').append('<p>' + theDay + ' ' + '<div class="the-surf">' + theMessage + '</div>' + ' ' + 'at' + ' ' + theLocation + ' ' + 'for the next few hours' + '</p>');
  };

  // Date stuff.
  var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  var timestamp = "1374267600";
  var jsDate = new Date(timestamp * 1000);
  console.log(jsDate);

  $('#dates').append('<div id="date">' + jsDate.toDateString() + '</div>' +
    '<div id="month">' + months[jsDate.getMonth()] + '</div>');

  // Geolocation stuff.
  var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  // ToDo - Don't think I need this anymore - remove underscore.
  // Get the current Time stamp with underscore.
  var timeThatIsNow = function() {
    return _.now();
  };
  console.log(timeThatIsNow());


});
