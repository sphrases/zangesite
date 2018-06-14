var connection = new RTCMultiConnection();
var roomName = prompt("Please enter the Room Name", "Zange");

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';


var desktopConstraints =
    connection.mediaConstraints = {

        video: {

            width: 800,
            height: 600,
            frameRate: 15,

        },

        audio: true
    };

//constraints for mobile browser
var mobileConstraints =
    {

        video: {

            width: 480,
            height: 320,


        },

        audio: true
    }


//if a user is using a mobile browser
if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
    var constraints = mobileConstraints;
} else {
    var constraints = desktopConstraints;
}

function hasUserMedia() {
    //check if the browser supports the WebRTC
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);
}

if (hasUserMedia()) {

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    //enabling video and audio channels
    navigator.getUserMedia(constraints, function (stream) {
        //var video = document.querySelector('video');

        //inserting our stream to the video tag
        // video.src = window.URL.createObjectURL(stream);

        // if you want audio+video conferencing


        connection.openOrJoin(roomName);

        /*connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,

        };*/


    }, function (err) {
    });
} else {
    alert("WebRTC is not supported");
}

console.log("show  " + JSON.stringify(constraints));