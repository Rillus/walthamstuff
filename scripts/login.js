var loginFormCallback = function(responseData) {
    if (responseData.status == 'success') {
        window.location.assign('./index.php');
    }
};

$(document).ready(function() {
    $('#loginButton').click(function() {
        insertTemplate('./login.html', '#loginHolder');
        
        // Delegate allows us to assign a click action to the closeLogin button despite the fact it doesn't exist until the above has been executed. 
        $('#loginHolder').delegate('#closeLogin','click',function() {
            $('#loginHolder').hide();
        });
    });
});
