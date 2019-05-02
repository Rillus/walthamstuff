var venue;

function setUpMap() {
    if (map === null) {
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(51.590420, -0.012275),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    }
    return map;
}

function setMarkers(map) {
    console.log(markers, map);
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function createMap(cat) {
    console.log(isDesktop);
    if (!isDesktop) {
        return;
    }

    map = setUpMap();

    console.log('createMap', cat);

    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});

    setMarkers(null);

    if (typeof cat === 'string' || cat === undefined) {
        getJSON('api/index.php/locations/category/'+encodeURIComponent(cat), function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                // google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
                //     map.setCenter(this.getPosition());
                //     map.fitBounds(this.getBounds());
                // });

                // google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
                //     alert('There was an error obtaining your position. Message: ' + e.message);
                // });
                var infoWindows = [];
                if (data !== null) {
                    data.forEach(function(element) {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(element.lat, element.lon),
                            map: map
                        });

                        markers.push(marker);

                        var contentString = buildContentString(element);

                        var infoWindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        infoWindows.push(infoWindow);

                        marker.addListener('click', function() {
                          for (i = 0; i < infoWindows.length; i++) {
                              infoWindows[i].close();
                          }
                          infoWindow.open(map, marker);
                        });

                        setMarkers(map);
                    });
                }

                GeoMarker.setMap(map);
            }
        });
    }
}

function displayVenue(venue) {
    console.log(venue);
    $('.VenueDetails-title').html(venue.name);
    $('.Header-titleText').html(venue.name);

    var values = [
        'address',
        'contact_name',
        'description',
        'email',
        'telephone',
        'twitter',
        'website',
    ];

    values.forEach(function(value) {
        console.log('.VenueDetails-'+value, venue[value]);
        $('.VenueDetails-'+value).html(venue[value]);
    });
}

function getLocationIdFromUrl() {
    var url = new URL(window.location),
        id = url.searchParams.get("id");

    return id;
}

function getLocation() {
    var id = getLocationIdFromUrl();
    getJSON('api/index.php/locations/id/' + id, function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            displayVenue(data[0]);
        }
    });
}

// Creates map and adds pins/infoWindows
function initialize() {
    getLocation();
}

function sanityCheckWebsite(website) {
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    website = 'http://'+website;
  }
  return website;
}

$(document).ready(function() {
    initialize();
});
