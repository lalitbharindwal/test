(function () {

    "use strict";

    var appTitle = "";

    var pages = [

        { url: "page.html" }

    ];

    function activated(eventObject) {

        if (eventObject.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {

            eventObject.setPromise(WinJS.UI.processAll().then(function () {

                var url = WinJS.Application.sessionState.lastUrl || pages[0].url;

                return WinJS.Navigation.navigate(url);

            }));

        }

    }

    WinJS.Navigation.addEventListener("navigated", function (eventObject) {

        var url = eventObject.detail.location;

        var host = document.getElementById("contentHost");

        host.winControl && host.winControl.unload && host.winControl.unload();

        WinJS.Utilities.empty(host);

        eventObject.detail.setPromise(WinJS.UI.Pages.render(url, host, eventObject.detail.state).then(function () {

            WinJS.Application.sessionState.lastUrl = url;

        }));

    });

    WinJS.Namespace.define("App", {

        appTitle: appTitle,

        pages: pages

    });

    WinJS.Application.addEventListener("activated", activated, false);

    WinJS.Application.start();

})(); 