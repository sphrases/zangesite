var connection = new RTCMultiConnection();

connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
var desktopConstraints =
    connection.mediaConstraints={
        video: {
            width:1280,
            height:720,
            frameRate:1,
        },
        audio: true
    };

//constraints for mobile browser
var mobileConstraints =
    connection.mediaConstraints ={
        video: {
            width: 480,
            height: 320,
            frameRate:1,
        },
        audio: true
    }


if(/Android|iPhone|iPad/i.test(navigator.userAgent))
{ var constraints = mobileConstraints;
} else {
    var constraints = desktopConstraints;
}

function hasUserMedia() {
//check if the browser supports the WebRTC
    return !!(navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);
}

connection.openOrJoin('your-room-id');

