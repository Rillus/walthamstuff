var map, GeoMarker, geocoder;

// Creates map and adds pins/infoWindows
function initialize(cat) {
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(51.590420, -0.012275),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});

    if (typeof cat === 'string' || cat === undefined) {
        getJSON('//maps.walthamstuff.com/api/index.php/locations/category/'+encodeURIComponent(cat), function(err, data) {
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
                    });
                }

                GeoMarker.setMap(map);
            }
        });
    } else {
        getJSON('//maps.walthamstuff.com/api/index.php/locations', function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                data.forEach(function(element) {
                  createUniqueCategoryList(element.category);
                });
                createCategoryList();
            }
        });
    }
}

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
  return contentString;
}

function sanityCheckWebsite(website) {
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    website = 'http://'+website;
  }
  return website;
}

function createCategoryList() {
    var filterListEle = document.getElementById('filter-list');
    var uniqueCategories = categories.sort();

    uniqueCategories.forEach(function(cat) {
        if (cat !== ''){
            var node = document.createElement("li"),
                anchorNode = document.createElement("a"),
                textNode = document.createTextNode(toTitleCase(cat));

            anchorNode.appendChild(textNode);
            anchorNode.href="";
            anchorNode.className += "Filter-listItemAnchor";
            node.appendChild(anchorNode);
            node.className += "Filter-listItem";

            filterListEle.appendChild(node);
        }
    });

    var classname = document.getElementsByClassName("Filter-listItemAnchor");

    var getNewCategory = function(e) {
        e.preventDefault();
        initialize(e.target.innerHTML);
    };

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', getNewCategory, false);
    }
}

// function onClickFilter(evt) {
//     console.log('hi', evt);
// }

var placeInCount = 0;

function geocodeIteration(data) {
    var element = data[placeInCount];
    if(element && element.address) {
        var address = element.address;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == 'OK') {
                // for (var i = 0; i < results.length; i++) {
                    var lat = results[0].geometry.location.lat(),
                        lon = results[0].geometry.location.lng(),
                        id = element.id;
                        
                    console.log(lat, lon, id);

                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", "//maps.walthamstuff.com/api/index.php/locations/post_latlon", true);
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhttp.send('id='+id+'&lat='+lat+'&lon='+lon);
                // }
            } else {
                console.log('Geocode was not successful for the following reason: ' + status, element);
            }
        });
    }
    
    if (placeInCount <= data.length) {
        placeInCount ++;

        window.setTimeout(function(){geocodeIteration(data);},600);
    }
}

// Fetches addresses with no associated lat/lon data and adds it to the database
function codeAddress() {
    geocoder = new google.maps.Geocoder();

    getJSON('//maps.walthamstuff.com/api/index.php/locations/no_latlon', function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            geocodeIteration(data);
        }
    });
}

// Turn this on to encode lat/lon into db
// codeAddress();

google.maps.event.addDomListener(window, 'load', initialize);

if(!navigator.geolocation) {
    alert('Your browser does not support geolocation');
}
