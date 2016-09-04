jQuery(document).ready(function($) {

  var surfsUp = function(theUrl, surfSpot) {
    $.ajax({
      dataType: "jsonp",
      url: theUrl
    }).done(function(forecast) {
      console.log(forecast);
      // The result is an array, so loop over each one.
      $.each(forecast, function() {
        // Do something with the item, e.g:
        var diff = this.swell.maxBreakingHeight - this.swell.minBreakingHeight;
        console.log('The swell diff is' + ' ' + diff);
        // Lets print out the rating with the time.
        var someRating = this.fadedRating;
        var theTime = this.localTimestamp;
        //convert theTime to hhmmss.
        //var months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
        var jsDate = new Date(theTime * 1000);
        if (someRating === 0) {
          someRating = 'No Surf';
        } else {
          someRating = "Surfs Up";
        }
        console.log("The rating at " + jsDate + " is " + someRating);
      });

      // Get the time slot
      var d = new Date();
      var n = d.getHours();
      var theSlot = 0;
      // Set the the slot to be in the current time slot.
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

      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var now = new Date(forecast[0].localTimestamp * 1000);
      var today = now.getDay();

      // TODO make sure this is working - This if you should surf during the current time slot.
      var theTimeNow = new Date(forecast[theSlot].localTimestamp * 1000);
      var theFadedRating = forecast[theSlot].fadedRating;
      var theSolidRating = forecast[theSlot].solidRating;
      var shouldYouSurf = theSolidRating + theFadedRating;
      console.log('The faded rating ' + theFadedRating);
      console.log('The solid rating ' + theSolidRating);
      console.log('Should you surf now ' + shouldYouSurf);
      if (shouldYouSurf === 0) {
        shouldYouSurf = 'No Surf';
      } else {
        shouldYouSurf = 'Surfs Up';
      }

      isThereSurf(days[today], shouldYouSurf, surfSpot);

      //console.log(shouldYouSurf + ' ' + theTimeNow);
      console.log(days[today] + ' ' + 'there is ' + shouldYouSurf + ' ' + 'at' + ' ' + surfSpot);

    });
  };

  // The message function.
  var isThereSurf = function(theDay, theMessage, theLocation) {
    $('#the-message').append('<p>' + theDay + ' ' + '<div class="the-surf">' + theMessage + '</div>' + ' ' + 'at' + ' ' + theLocation + ' ' + 'for the next few hours' + '</p>');
    $('.loading-area').css('display', 'none');
  };

  // Walcott 1399
  // 110 mile 118
  //var url = 'http://magicseaweed.com/api/e09cd1c1b299437bce992b12b4f69800/forecast/?spot_id=118';
  // Just the stuff I need.
  // Walcott
  var url = 'http://magicseaweed.com/api/e09cd1c1b299437bce992b12b4f69800/forecast/?spot_id=1399&fields=localTimestamp,swell.*,fadedRating,solidRating';
  var location = 'Walcott';
  // 100 Mile
  //var url = 'http://magicseaweed.com/api/e09cd1c1b299437bce992b12b4f69800/forecast/?spot_id=118&fields=localTimestamp,swell.*,fadedRating,solidRating';
  //var location = '100 Mile Beach';

  surfsUp(url, location);

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

});
