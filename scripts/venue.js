var venue,
    map = null,
    markers = [];

function buildContentString(element) {
    var contentString = '<h2>'+element.name+'</h2>'+
    '<p>'+element.address+'</p>';
    if (element.description) {
        contentString += '<p>'+element.description+'</p>';
    }
    if (element.email) {
        contentString += '<p>Email: '+element.email+'</p>';
    }
    if (element.website) {
        contentString += '<p>Website: <a href="'+sanityCheckWebsite(element.website)+'">'+element.website+'</p>';
    }
    if (element.twitter) {
        contentString += '<p>Twitter: '+element.twitter+'</p>';
    }
    if (element.telephone) {
        contentString += '<p>Telephone: '+element.telephone+'</p>';
    }

    contentString += '<a href="edit.html?id='+element.id+'">Edit</a>';

    return contentString;
}

function sanityCheckWebsite(website) {
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    website = 'http://'+website;
  }
  return website;
}

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
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function createMap(cat) {
    map = setUpMap();

    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});

    setMarkers(null);

    if (typeof cat === 'string' || cat === undefined) {

        getJSON(apiBaseUrl + 'locations/category/'+encodeURIComponent(cat), function(err, data) {

            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(venue.lat, venue.lon),
                    map: map
                });

                markers.push(marker);

                var contentString = buildContentString(venue);

                var infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                infoWindow.open(map, marker);

                setMarkers(map);

                GeoMarker.setMap(map);
            }
        });
    }
}

function displayVenue() {
    console.log(venue);
    $('.VenueDetails-title').html(venue.name);
    $('.Header-titleText').html(venue.name);

    if (venue.image !== '' && venue.image !== null) {
        $('.VenueDetails-hero').attr('style', 'background-image: url("'+venue.image+'")');
    }

    var values = [
        'address',
        'contact_name',
        'description',
        'opening_times',
        'email',
        'telephone',
        'twitter',
        'website',
        'offers',
        'image'
    ];

    values.forEach(function(value) {
        console.log('.VenueDetails-'+value, venue[value]);
        if (venue[value] !== undefined && venue[value] !== "" && venue[value] !== null) {
            $('.VenueDetails-'+value+'Content').html(venue[value]);
            $('.VenueDetails-'+value).show();
        }
    });
}

function getLocationIdFromUrl() {
    var url = new URL(window.location),
        id = url.searchParams.get("id");

    return id;
}

function getLocation() {
    var id = getLocationIdFromUrl();

    getJSON(apiBaseUrl + 'locations/id/' + id, function(err, data) {

        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            venue = data;
            displayVenue(data);
            
            // Fire this after everything else to prevent runtime error
            createMap();
        }
    });
}

// Creates map and adds pins/infoWindows
function initialize() {
    
    if (userData.loggedIn) {
        console.log('user is logged in');
        $('.j-isLoggedIn').show();
        $('.j-isNotLoggedIn').hide();
    } else {
        $('.j-isLoggedIn').hide();
        $('.j-isNotLoggedIn').show();
    }

    getLocation();
}

function sanityCheckWebsite(website) {
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    website = 'http://'+website;
  }
  return website;
}

$(document).ready(function() {
    // Ensure we know if the user is logged in - run this whenever we need to fetch and check user state from the server
    checkLogin();
    
    initialize();
});
