(function () {

    var pageOutput = WinJS.Class.define(

        function (element, options) {

            element.winControl = this;

            this.element = element;

            new WinJS.Utilities.QueryCollection(element)

                        .setAttribute("role", "region")

                        .setAttribute("aria-labelledby", "outputLabel")

                        .setAttribute("aria-live", "assertive");

            element.id = "output";

 

            this._addOutputLabel(element);

            this._addStatusOutput(element);

        }, {

            _addOutputLabel: function (element) {

                var label = document.createElement("h2");

                label.id = "outputLabel";

                label.textContent = "Output";

                element.parentNode.insertBefore(label, element);

            },

            _addStatusOutput: function (element) {

                var statusDiv = document.createElement("div");

                statusDiv.id = "statusMessage";

                element.insertBefore(statusDiv, element.childNodes[0]);

            }

        }

    );

    var currentpageUrl = null;

 

    WinJS.Navigation.addEventListener("navigating", function (evt) {

        currentpageUrl = evt.detail.location;

    });

 

    WinJS.log = function (message, tag, type) {

        var statusDiv = document.getElementById("statusMessage");

    };

    function activated(e) {

        WinJS.Utilities.query("#featureLabel")[0].textContent = App.appTitle;

    }

    WinJS.Application.addEventListener("activated", activated, false);

    WinJS.Namespace.define("App", {

        pageOutput: pageOutput

    });

})(); 