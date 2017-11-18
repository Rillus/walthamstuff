var map, GeoMarker;

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function initialize() {
    getJSON('http://maps.walthamstuff.com/api/index.php/locations', function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {

            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(51.590420, -0.012275),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
          
            map = new google.maps.Map(document.getElementById('map_canvas'),
                mapOptions);

            GeoMarker = new GeolocationMarker();
            GeoMarker.setCircleOptions({fillColor: '#808080'});

            // google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
            //     map.setCenter(this.getPosition());
            //     map.fitBounds(this.getBounds());
            // });

            // google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
            //     alert('There was an error obtaining your position. Message: ' + e.message);
            // });
            
            data.forEach(function(element) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(element.lat, element.lon),
                    map: map
                });

                var contentString = '<h2>'+element.name+'<h2><p>'+element.description+'</p>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);

                    openWindow = infowindow;
                });
            });


            GeoMarker.setMap(map);

        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

if(!navigator.geolocation) {
    alert('Your browser does not support geolocation');
}