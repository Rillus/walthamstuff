<!DOCTYPE html>
<html>
    <head>
        <title>Walthamstuff Map</title>
        <link rel="stylesheet" href="stylesheets/bootstrap.min.css">
        <link rel="stylesheet" href="stylesheets/main.css">
        <link rel="stylesheet" href="scripts/jquery.datetimepicker.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <script src="scripts/moment.min.js"></script>
        <script
          src="https://code.jquery.com/jquery-3.4.0.min.js"
          integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
          crossorigin="anonymous"></script>
        <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAuS_MJIVCEDCGeA0uWQXZL7Ybht6bnjg8"></script>
        <script src="scripts/geolocation-marker.js"></script>
        <script src="scripts/common.js"></script>
        <script src="scripts/category.js"></script>
        <script src="scripts/maps.js"></script>
        <script src="scripts/login.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <script src="scripts/bootstrap.min.js"></script>
        <script src="scripts/jquery.datetimepicker.js"></script>


        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-85517052-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // gtag('config', 'UA-85517052-1');
        </script>
    </head>
    <body>
      <header class="Header">
         <?php include "./includes/header.html" ?>
      </header>
      <section class=Search-section>
        <div class="Intro" id="Intro-text">
          <h2> Find what you need, locally</h2>
        </div>
        <?php include "./includes/category.html" ?> 
      </section>

      <div class="Main">
        <section class="Venues">
            <ul class="Venues-list" id="venue-list"></ul>
        </section>
        <div id="map_canvas" class="Map"></div>
      <div id="loginHolder" class="Login-wrapper u-hide"></div>
    </body>
</html>
