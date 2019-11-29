<!DOCTYPE html>
<html>
    <head>
        <title>Walthamstuff Map</title>
        <link rel="stylesheet" href="stylesheets/bootstrap.min.css">
        <link rel="stylesheet" href="stylesheets/main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <script
          src="https://code.jquery.com/jquery-3.4.0.min.js"
          integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
          crossorigin="anonymous"></script>
        <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAuS_MJIVCEDCGeA0uWQXZL7Ybht6bnjg8"></script>
        <script src="scripts/geolocation-marker.js"></script>
        <script src="scripts/common.js"></script>
        <script src="scripts/venue.js"></script>
        <script src="scripts/bootstrap.min.js"></script>
        <script src="scripts/dragdrop.js"></script>

        <!-- Global site tag (gtag.js) - Google Analytics -->
<!--
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-85517052-1"></script>
-->
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // gtag('config', 'UA-85517052-1');
        </script>

        <script>
        function goBack() {
        window.history.back();
        }
        </script>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
            <header class="Header">
                <?php include "./includes/header.html" ?>
            </header>
            </div>
      </div>


      <div class="container adjacent-footer">
      <button class="btn btn-default" onclick="goBack()" type="button">< Back to Search</button>
      <section class="VenueDetails">
        <div class="VenueDetails-hero">
            <div id="map_canvas" class="Map--venue"></div>
                <div class="VenueDetails-heroDetails">
                    <h1 class="VenueDetails-title"></h1>

                    <div class="VenueDetails-address u-hide">
                        <p class="VenueDetails-addressContent"></p>
                    </div>
                </div>
                <!-- <div class="VenueDetails-dateprice">
                    <p class="VenueDetails-price">£1300</p>
                    <p class="VenueDetails-date">for: 13/05/2019, 3pm - 11pm <span class="VenueDetails-greyed">Change dates</span></p>
                </div>
                <div class="VenueDetails-actions">
                    <a class="Button Button--primary" href="#">Book now</a>
                    <a class="Button Button--secondary" href="#">Contact</a>
                </div> -->
            </div>


            <div class="VenueDetails-openingTimes u-hide">
                <h3>Opening Times</h3>
                <p class="VenueDetails-openingTimesContent"></p>
            </div>

            <div class="VenueDetails-description u-hide">
                <h3>Description</h3>
                <p class="VenueDetails-descriptionContent"></p>
            </div>

            <!-- <div class="VenueDetails-images">
                <div class="VenueDetails-image" style="background-image:url(https://www.wmgallery.org.uk/media/w770/generic/WMG_reception.jpg);"></div>
                <div class="VenueDetails-image" style="background-image:url(https://missgen.com/wp-content/uploads/2017/04/002-william-morris-gallery-wedding-photographer.jpg);"></div>
                <div class="VenueDetails-image" style="background-image:url(https://go.skimresources.com/?id=71026X1533819&xs=1&isjs=1&url=https%3A%2F%2Fhitchedukir.hitched.co.uk%2FTemp%2F1000_1000_scaled_1989322_william-morr-20180130112206502.jpg&xguid=01CYPDNZ6TPBXG3KEYTZMKHQT6&xuuid=a3cd7ea24ae71cd0345940b016468095&xsessid=&xcreo=0&xed=0&sref=https%3A%2F%2Fwww.hitched.co.uk%2Fwedding-venues%2Fwilliam-morris-gallery_7792.htm&pref=https%3A%2F%2Fwww.google.co.uk%2F&xtz=-60&jv=13.15.1-stackpath&bv=2.5.1);"></div>
            </div> -->

        </section>

    </div>
    </body>
</html>
