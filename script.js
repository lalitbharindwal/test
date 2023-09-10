(function () {

    "use strict";

    var page = WinJS.UI.Pages.define("page.html", {

        ready: function (element, options) {

            document.getElementById("buttonInitialize").addEventListener("click", initDevice, false);

            document.getElementById("buttonIncomingCall").addEventListener("click", newIncomingCall, false);

            document.getElementById("buttonHangUp").addEventListener("click", hangupButton, false);

        }

    });

    var callControls = null;

    var callToken;

    var audiotag;

    function displayStatus(message) {

        WinJS.log && WinJS.log(getTimeStampedMessage(message), "Call Control", "status");

    }

    function displayError(message) {

        WinJS.log && WinJS.log(getTimeStampedMessage(message), "Call Control", "error");

    }

    function id(elementId) {

        return document.getElementById(elementId);

    }

    function initDevice() {

        if (!callControls) {

            callControls = Windows.Media.Devices.CallControl.getDefault();

 

            if (callControls) {

                callControls.addEventListener("answerrequested", answerButton, false);

                callControls.addEventListener("hanguprequested", hangupButton, false);

                callControls.addEventListener("audiotransferrequested", audiotransferButton, false);

                callControls.addEventListener("redialrequested", redialButton, false);

                callControls.addEventListener("dialrequested", dialButton, false);

                displayStatus("Call Controls Initialized");

                id("buttonIncomingCall").disabled = false;

                id("buttonHangUp").disabled = true;

                id("buttonInitialize").disabled = true;

            } else {

                displayError("No Bluetooth device detected.");

            }

        }

    }

 

    function newIncomingCall() {

        callToken = callControls.indicateNewIncomingCall(true, "8928266355");

        displayStatus("Call Token: " + callToken);

        id("buttonIncomingCall").disabled = true;

    }

    function answerButton() {

        displayStatus("Answer requested: " + callToken);

        callControls.indicateActiveCall(callToken);

        audiotag = document.getElementById("audiotag");

        audiotag.play();

        id("buttonHangUp").disabled = false;

    }

    function hangupButton() {

        displayStatus("Hangup requested");

        callControls.endCall(callToken);

        audiotag = document.getElementById("audiotag");

        audiotag.pause();

        id("buttonIncomingCall").disabled = false;

        id("buttonHangUp").disabled = true;

        callToken = 0;

    }

    function audiotransferButton() {

        displayStatus("Audio Transfer requested");

    }

    function redialButton(redialRequestedEventArgs) {

        displayStatus("Redial requested");

        redialRequestedEventArgs.handled();

    }

    function dialButton(dialRequestedEventArgs) {

        if (typeof (dialRequestedEventArgs.contact) === "number") {

            displayStatus("Dial requested: " + dialRequestedEventArgs.contact);

            dialRequestedEventArgs.handled();

        }

        else {

            displayStatus("Dial requested: " + dialRequestedEventArgs.contact.schemeName + ":" +

            dialRequestedEventArgs.contact.path);

            dialRequestedEventArgs.handled();

        }

    }

    function getTimeStampedMessage(eventCalled) {

        var timeformat = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("longtime");

        var time = timeformat.format(new Date());

        var message = eventCalled + "\t\t" + time;

        return message;

    }

})(); 