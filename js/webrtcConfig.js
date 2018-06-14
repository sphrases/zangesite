// get references to select list and display text box
var sel = document.getElementById('scripts');
var el = document.getElementById('display');
var connectionChannel = "Zange";

function getSelectedOption(sel) {
    var opt;
    for (var i = 0, len = sel.options.length; i < len; i++) {
        opt = sel.options[i];
        if (opt.selected === true) {
            break;
        }
    }
    return opt;
}

// assign onclick handlers to the buttons
document.getElementById('showVal').onclick = function () {
    /*var oldVideos = document.getElementsByTagName('video');
    console.log(oldVideos);
    if (oldVideos.length > 0) {
        for (var videox of oldVideos) {

            videox.parentNode.removeChild(videox);

        }
    }*/
    connectionChannel = sel.value;
    initWebRTC();
    document.getElementById('showVal').disabled = true;

}


function initWebRTC() {
    var connection = new RTCMultiConnection();
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


            connection.openOrJoin(connectionChannel);

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

}