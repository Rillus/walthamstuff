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
    console.log(markers, map);
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function createMap(cat) {
    map = setUpMap();

    console.log('createMap', cat);

    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});

    setMarkers(null);

    if (typeof cat === 'string' || cat === undefined) {

        getJSON('http://maps.walthamstuff.com/dev/api/index.php/locations/category/'+encodeURIComponent(cat), function(err, data) {

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

    var values = [
        'address',
        'contact_name',
        'description',
        'email',
        'telephone',
        'twitter',
        'website',
    ];

    // values.forEach(function(value) {
    //     console.log('.VenueDetails-'+value, venue[value]);
    //     $('.VenueDetails-'+value).html(venue[value]);
    // });
}

function getLocationIdFromUrl() {
    var url = new URL(window.location),
        id = url.searchParams.get("id");

    return id;
}

function getLocation() {
    var id = getLocationIdFromUrl();

    getJSON('http://maps.walthamstuff.com/dev/api/index.php/locations/id/' + id, function(err, data) {

        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            venue = data[0];
            displayVenue(data[0]);
            //Moved createMap() from line 142 to stop asynch bug
            createMap();
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
