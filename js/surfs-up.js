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


// Date stuff

function formatDate(date, fmt) {
    function pad(value) {
        return (value.toString().length < 2) ? '0' + value : value;
    }
    return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
        switch (fmtCode) {
        case 'Y':
            return date.getUTCFullYear();
        case 'M':
            return pad(date.getUTCMonth() + 1);
        case 'd':
            return pad(date.getUTCDate());
        case 'H':
            return pad(date.getUTCHours());
        case 'm':
            return pad(date.getUTCMinutes());
        case 's':
            return pad(date.getUTCSeconds());
        default:
            throw new Error('Unsupported format code: ' + fmtCode);
        }
    });
}

formatDate(new Date(timestamp), '%H:%m:%s');
