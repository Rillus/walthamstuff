function createCategoryList() {
    var filterListEle = document.getElementById('filter-list');
    var uniqueCategories = categories.sort();
    var select = document.getElementById("category");

    uniqueCategories.forEach(function(cat, index) {
        if (cat !== ''){
            var option = document.createElement("option");
            option.text = toTitleCase(cat);
            option.setAttribute('value', cat);
            if (parseInt(index, 10) === 0) {
                option.setAttribute('selected', 'selected');
            }
            select.add(option);
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

var init = function() {
        if (userData.loggedIn) {
            console.log('user is logged in');
            $('.j-isLoggedIn').show();
            $('.j-isNotLoggedIn').hide();
        } else {
            $('.j-isLoggedIn').hide();
            $('.j-isNotLoggedIn').show();
        }
    },
    addFormCallback = function(responseData) {
        if (responseData.status == 'success') {
            var id = responseData.data.venueId;
            window.location.assign('venue.html?id=' + id);
        }
    };

window.onload = function () {
    getJSON(apiBaseUrl + 'locations', function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            data.forEach(function(element) {
                createUniqueCategoryList(element.category);
            });
            createCategoryList();
        }
    });

    // Ensure we know if the user is logged in - run this whenever we need to fetch and check user state from the server
    checkLogin();

    // kick things off
    init();
    
    // If we're not logged in, things can't start.
    // This is custom listener function on userdata.loggedIn allows us to watch for changes
    userData.addListener(function(val) {
        init();
    });
};

