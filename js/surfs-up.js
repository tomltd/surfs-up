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
alert(days[today]);