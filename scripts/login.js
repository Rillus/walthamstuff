var loginFormCallback = function(responseData) {
    $('#loginError').empty();
    if (responseData.status == 'success') {
        window.location.assign('./add.php');
    } else if (responseData.status == 'error') {
        // Display error feedback
        displayErrorMessage(responseData.reason, '#loginError');
    }
};

$(document).ready(function() {
    $('.j-loginButton').click(function() {
        insertTemplate('./login.html', '#loginHolder');
        
        // Delegate allows us to assign a click action to the closeLogin button despite the fact it doesn't exist until the above has been executed. 
        $('#loginHolder').delegate('#closeLogin','click',function() {
            $('#loginHolder').hide();
        });
    });
});
