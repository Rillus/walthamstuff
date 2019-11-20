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
                    <?php 
                        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
                        $url_part =  (explode("/", $path));
                        $formType = ($url_part[2] == 'add.php')? 'add': 'edit'; 
                    ?>

                    <form class="form-container" method="post" id="<?php echo $formType ?>Form" action="http://maps.walthamstuff.com/dev/api/index.php/add/location">
                      <fieldset>
                          <h2><?php echo ($formType == 'add') ? "Add Details" : "Edit Details" ?></h2>
                          <div class="form-group">
                              <label for="postcode">Postcode</label>
                              <input type="text" id="postcode" name="postcode" class="form-control">
                          </div>
                          <div class="form-group">
                              <label for="name">Name of Place</label>
                              <input type="text" id="name" name="name" class="form-control">
                          </div>
                          <div class="form-group">
                              <label for="address">Address</label>
                              <input type="text" id="address" name="address" class="form-control">
                          </div>
                          <div class="form-group">
                              <label for="category">Categories</label>
                              <select name="category" id="category" class="form-control">

                              </select>
                          </div>
                          <div class="form-group">
                              <label for="description">Description</label>
                              <textarea type="text" id="description" name="description" class="form-control"></textarea>
                          </div>
                          <div class="form-group">
                              <label for="website">Website</label>
                              <input type="text" id="website" name="website" class="form-control">
                          </div>
                          <div class="form-group">
                              <label for="twitter">Twitter</label>
                              <input type="text" id="twitter" name="twitter" class="form-control">
                          </div>
                      </fieldset>
                      <fieldset>
                          <div class="form-group">
                              <label for="contributor_name">Your name</label>
                              <input type="text" id="contributor_name" name="contributor_name" class="form-control">
                          </div>
                          <div class="form-group">
                              <label for="contributor_email">Your email <small>(so we can keep you updated about your submission)</small></label>
                              <input type="text" id="contributor_email" name="contributor_email" class="form-control">
                          </div>
                      </fieldset>
                      <button value="Submit" class="btn btn-primary" onclick="sendData(event, 'add')">Submit</button>
                    </form>
                </div>
            </div>
        </div>

        <div id="loginHolder" class="Login-wrapper u-hide"></div>
    </body>
</html>
