// current date and time
var dateStr = new Date().toString();


//Day
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var now = new Date();
var theDay = now.getDay();
var nameOfToday = dayNames[theDay];


var days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
var now = new Date();
var today = now.getDay();
//alert(days[today]);


console.log('hello');


var url = 'http://magicseaweed.com/api/e09cd1c1b299437bce992b12b4f69800/forecast/?spot_id=1398'

$.ajax({
    dataType: "jsonp",
    url: url
}).done(function(data) {
    console.log(data);
    // The result is an array, so loop over each one
    $.each(data, function() {
        // Do something with the item, e.g:
        var diff = this.swell.maxBreakingHeight - this.swell.minBreakingHeight;
        console.log(diff);
        var rating = this.fadedRating;
        var theTime = this.localTimestamp;
        console.log("The rating at" + theTime + " is " + rating);
    });
});

//console.log(data.["0"].solidRating);


var rating = [];

// Loop the solid rating on a single forecast object.
for (var i = 0; i < forecast.solidRating; i++) {
    rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
}

// Loop the faded rating on a single forecast object.
for (var i = 0; i < forecast.fadedRating; i++) {
    rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');
}

document.getElementById("ratingContainer").innerHTML = rating.join(" ");
