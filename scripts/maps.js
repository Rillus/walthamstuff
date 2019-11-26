var map = null,
    GeoMarker,
    geocoder,
    markers = [],
    isDesktop,
    venues;

function setUpMap() {
    if (map === null) {
        var mapOptions = {
            zoom: 13,
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
    console.log(isDesktop);
    if (!isDesktop) {
        return;
    }

    map = setUpMap();

    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});

    setMarkers(null);

    if (typeof cat === 'string' || cat === undefined) {
        getJSON('http://maps.walthamstuff.com/dev/api/index.php/locations/category/'+encodeURIComponent(cat), function(err, data) {
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

// Creates map and adds pins/infoWindows
function initialize() {
    console.log('init');

    getJSON('https://maps.walthamstuff.com/dev/api/index.php/locations', function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            if (data !== null) {
                venues = data;

                data.forEach(function(element) {
                    createUniqueCategoryList(element.category);
                });
                createCategoryList();
            }
        }
    });
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

    contentString += '<a href="edit.html?id='+element.id+'">Edit</a>';

    return contentString;
}

function hideIntro() {
    let intro = document.getElementById("Intro");
    intro.style.display = "none";
}

function sanityCheckWebsite(website) {
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    website = 'http://'+website;
  }
  return website;
}

function getVenuesByCategory(){
    var classname = document.getElementsByClassName("Filter-listItemAnchor dropdown-item");

    var getNewCategory = function(e) {
        e.preventDefault();
        hideIntro();
        createMap(e.target.innerHTML);
        createVenueList( venues, e.target.innerHTML);
    };

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', getNewCategory, false);
    }  
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
            anchorNode.href="#";
            anchorNode.className += "Filter-listItemAnchor dropdown-item";
            node.appendChild(anchorNode);
            node.className += "Filter-listItem";

            filterListEle.appendChild(node);
        }
    });  
    getVenuesByCategory();
}

function highlightVenue(e) {
    setMarkers(null);
    var thisVenueId;

    // if the class 'Venues-listItemDescription' is on the target element then we're on a child, so navigate up one to get the id
    if ($(e.target.parentNode).hasClass('Venues-listItemDescription')) {
    // we're inside the the div
        thisVenueId = e.target.parentNode.parentNode.attributes['data-venueid'].value;
    } else if ($(e.target).hasClass('Venues-listItemDescription')){
        // we are on the div itself
        thisVenueId = e.target.parentNode.attributes['data-venueid'].value;
    }
    else {
        // if that class isn't on here, we're already on the parent
        thisVenueId = e.target.attributes['data-venueid'].value;
    }
    
    var thisVenue = $.grep(venues, function(e){ return e.id == thisVenueId; });

    thisVenue = thisVenue[0];

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(thisVenue.lat, thisVenue.lon),
        map: map
    });

    markers = [];
    markers.push(marker);

    setMarkers(map);
}

function rollOffVenue() {
    setMarkers(null);
}

function resetList(list) {     
    $(list).empty();
}

function createVenueList(venues, category) {
    var venueListEle = document.getElementById('venue-list');

    resetList(venueListEle);
    venues.forEach(function(venue) {
    if (category === venue.category) {

        var listNode = document.createElement("li"),
            anchorNode = document.createElement("a"),
            descriptionNode = document.createElement("div"),
            nameNode = document.createElement("h4"),
            nameDetailsNode = document.createTextNode(toTitleCase(venue.name)),   
            addressNode = document.createElement("p"),
            addressDetailsNode = document.createTextNode(toTitleCase(venue.address)),
            categoryNode = document.createElement("span"),
            categoryDetailsNode = document.createTextNode(toTitleCase(venue.category));
            telephoneNode = document.createElement("span"),
            telephoneDetailsNode = document.createTextNode(toTitleCase(venue.telephone));

        anchorNode.appendChild(descriptionNode);
        anchorNode.href="venue.html?id="+venue.id;
        anchorNode.id="venue-"+venue.id;
        anchorNode.setAttribute('data-venueid', venue.id);
        anchorNode.className += "Venues-listItemAnchor";

        categoryNode.className += "small-text";

        nameNode.appendChild(nameDetailsNode);
        addressNode.appendChild(addressDetailsNode);
        categoryNode.appendChild(categoryDetailsNode);
        telephoneNode.appendChild(telephoneDetailsNode);

        descriptionNode.appendChild(nameNode);
        descriptionNode.appendChild(categoryNode);
        descriptionNode.appendChild(addressNode);
        descriptionNode.appendChild(telephoneNode);
        descriptionNode.className += "Venues-listItemDescription";

        listNode.appendChild(anchorNode);
        listNode.className += "Venues-listItem";

        venueListEle.appendChild(listNode);
        var thisEle = document.getElementById("venue-"+venue.id);
        thisEle.addEventListener('mouseover', highlightVenue, false);
        thisEle.addEventListener('mouseout', rollOffVenue, false);
        }
    });
}

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

                    xhttp.open("POST", "https://maps.walthamstuff.com/dev/api/index.php/locations/post_latlon", true);
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

    getJSON('https://maps.walthamstuff.com/dev/api/index.php/locations/no_latlon', function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            if (data !== null) {
                geocodeIteration(data);
            }
        }
    });
}

// Turn this off if every address has lat/lon (now you can add locations, we'll let this add the correct data upon page load if necessary)
// codeAddress();


$(document).ready(function() {
    initialize();
    isDesktop = $(window).width() > 600;

    if (isDesktop) {
        google.maps.event.addDomListener(window, 'load', createMap);
    }

    /* listen out for end of window resize and fire createMap function if on Desktop */
    var resizeTime;
    var resizeTimeout = false;
    var delta = 200;

    $(window).resize(function() {
        resizeTime = new Date();
        if (resizeTimeout === false) {
            resizeTimeout = true;
            setTimeout(resizeEnd, delta);
        }
    });

    function resizeEnd() {
        if (new Date() - resizeTime < delta) {
            setTimeout(resizeEnd, delta);
        } else {
            resizeTimeout = false;
            var isDesktopNow = $(window).width() > 600;

            if (isDesktopNow && !isDesktop) {
                isDesktop = isDesktopNow;
                createMap();
            }
        }
    }
    /* -- end resize stuff */

    jQuery('#datetimepicker').datetimepicker({format: 'D/M/YYYY H:mm',});
    jQuery('#datetimepicker2').datetimepicker({format: 'D/M/YYYY H:mm',});

    $.datetimepicker.setDateFormatter({
        parseDate: function (date, format) {
            var d = moment(date, format);
            return d.isValid() ? d.toDate() : false;
        },
        formatDate: function (date, format) {
            return moment(date).format(format);
        },
    });

});


if(!navigator.geolocation) {
    alert('Your browser does not support geolocation');
}
