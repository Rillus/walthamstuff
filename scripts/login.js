function loginAction(e) {
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
        if (JSON.parse(XHR.responseText).logged_in == 'yes') {
            $('#loginHolder').hide();
        }
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
        alert('Oops! Something goes wrong.');
    });

    // Set up our request
    XHR.open('POST', apiBaseUrl+'login/login_action');

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Finally, send our data.
    XHR.send(urlEncodedData);
}

$(document).ready(function() {
    $('#loginButton').click(function() {
        insertTemplate('./login.html', '#loginHolder');
        
        // Delegate allows us to assign a click action to the closeLogin button despite the fact it doesn't exist until the above has been executed. 
        $('#loginHolder').delegate('#closeLogin','click',function() {
            $('#loginHolder').hide();
        });
    });
});
