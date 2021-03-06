<!DOCTYPE html>
<html>
    <head>
        <title>Add a new location to Walthamstuff Map</title>
        <link rel="stylesheet" href="stylesheets/bootstrap.min.css">
        <link rel="stylesheet" href="stylesheets/main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <script
            src="https://code.jquery.com/jquery-3.4.0.min.js"
            integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
            crossorigin="anonymous"></script>
        <script src="scripts/common.js"></script>
        <script src="scripts/add.js"></script>
        <script src="scripts/login.js"></script>
        <script src="scripts/bootstrap.min.js"></script>
        <script src="scripts/jquery.datetimepicker.js"></script>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <header class="Header">
                    <?php include "./includes/header.html" ?>
                </header>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <?php include "./includes/form.php" ?>
                </div>
            </div>
        </div>
        <div id="loginHolder" class="Login-wrapper u-hide"></div>
    </body>
</html>
