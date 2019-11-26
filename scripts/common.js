var categories = [],
    apiBaseUrl = 'http://localhost/walthamstuff-maps/api/index.php/', //'http://maps.walthamstuff.com/dev/api/index.php';
    userData = {
        loggedInInternal: false,
        loggedInListener: function(val) {},
        set loggedIn(val) {
            this.loggedInInternal = val;
            this.loggedInListener(val);
        },
        get loggedIn() {
            return this.loggedInInternal;
        },
        addListener: function(listener) {
            this.loggedInListener = listener;
        }
    };

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var code = xhr.status;
        if (code === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function createUniqueCategoryList(cat) {
    if (!categories.includes(cat.toLowerCase())) {
        categories.push(cat.toLowerCase());
    }
}

function extractFormInputKeyValue(inputs) {
    var urlEncodedDataPairs = [];

    // Turn the data object into an array of URL-encoded key/value pairs.
    for(var i = 0; i < inputs.length; i++) {
        urlEncodedDataPairs.push(encodeURIComponent(inputs[i].name) + '=' + encodeURIComponent(inputs[i].value));
    }

    return urlEncodedDataPairs;
}

function sendData(e, url, callback) {
    e.preventDefault();

    var XHR = new XMLHttpRequest(),
        urlEncodedData = "",
        urlEncodedDataPairs = [],
        name,
        thisForm = e.target.form,
        inputs = thisForm.getElementsByTagName("input"),
        textareas = thisForm.getElementsByTagName("textarea"),
        selects = thisForm.getElementsByTagName("select");

    // Turn the data object into an array of URL-encoded key/value pairs.
    urlEncodedDataPairs = extractFormInputKeyValue(inputs);
    urlEncodedDataPairs = urlEncodedDataPairs.concat(extractFormInputKeyValue(textareas));
    urlEncodedDataPairs = urlEncodedDataPairs.concat(extractFormInputKeyValue(selects));

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
        if (url == 'add' || url == 'edit') {
            id = JSON.parse(XHR.responseText).data.venueId;
            window.location.assign('venue.html?id=' + id);
        } else {
            callback(JSON.parse(XHR.responseText));
        }
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
        alert('Oops! Something goes wrong.');
    });

    // Set up our request
    XHR.open('POST', apiBaseUrl+url);

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Finally, send our data.
    XHR.send(urlEncodedData);
}

function insertTemplate(filename, target) {
    $(target).load(filename).show();
}

function checkLogin() {
    var url = apiBaseUrl + 'login/check_login',
        callbackFunction = function(status, response) {
            if (response.data !== undefined && response.data.logged_in !== undefined) {
                userData.loggedIn = response.data.logged_in;
                userData.userId = response.data.userId;
                userData.userStatus = response.data.status;
            }
        };

    getJSON(url, callbackFunction);
}
