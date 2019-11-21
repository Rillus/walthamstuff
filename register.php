<!DOCTYPE html>
<html>
    <head>
        <title>Edit location to Walthamstuff Map</title>
        <link rel="stylesheet" href="stylesheets/bootstrap.min.css">
        <link rel="stylesheet" href="stylesheets/main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <script
          src="https://code.jquery.com/jquery-3.4.0.min.js"
          integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
          crossorigin="anonymous"></script>
        <script src="scripts/register.js"></script>
        <script src="scripts/common.js"></script>
        <script src="scripts/login.js"></script>
        <script src="scripts/bootstrap.min.js"></script>
    </head>
    <body>
        <header class="Header">
            <?php include "./includes/header.html" ?>
        </header>
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <form class="Form form-container" method="post" id="registerForm" action="register">
                        <fieldset>
                            <h2>Create an account</h2>
                            <p>Once you're registered you'll be able to add and edit entries on Walthamstuff's business directory.</p>
                            <p>We'll send you an email to verify your address. Simply click the link and you can create your business entry.</p>
                            <label class="Label form-group">
                                Email<br>
                                <input type="text" id="email" name="email" class="Input form-control" required>
                            </label>
                            <label class="Label form-group">
                                Password<br>
                                <input type="password" id="password" name="password" class="Input form-control" required>
                            </label>
                            <label class="Label form-group">
                                <input type="checkbox" onclick="showPassword()"> Show Password
                            </label>
                        </fieldset>
                        <button value="Submit" class="btn btn-primary" onclick="sendData(event, 'register', registerFormCallback)">Create my acccount</button>
                    </form>
                </div>
            </div>
        </div>

        <div id="loginHolder" class="Login-wrapper u-hide"></div>
    </body>
</html>
