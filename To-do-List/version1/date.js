// Provided to use this function which import this file
module.exports.getDate = getDate
// exports.getDate = getDate

function getDate() {    
    var t = new Date();

    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    }

    var day = t.toLocaleDateString("en-US",options);

    return day;
}

module.exports.getDay = getDay;

function getDay() {
    var t = new Date();

    var options = {
        weekday : "long"
    }

    var day = t.toLocaleDateString("en-US",options);

    return day;   

}