window.onload = function () {
    getJSON('//maps.walthamstuff.com/api/index.php/locations', function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            data.forEach(function(element) {
                createUniqueCategoryList(element.category);
            });
            createCategoryList();
            getLocation();
            updateFormAction();
        }
    });
};

function getLocationIdFromUrl() {
    var url = new URL(window.location),
        id = url.searchParams.get("id");

    return id;
}

function getLocation () {
    var id = getLocationIdFromUrl();
    getJSON('//maps.walthamstuff.com/api/index.php/locations/id/' + id, function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            populateForm(data[0]);
        }
    });
}

function createCategoryList() {
    var filterListEle = document.getElementById('filter-list');
    var uniqueCategories = categories.sort();
    var select = document.getElementById("category");

    uniqueCategories.forEach(function(cat, index) {
        if (cat !== ''){
            var option = document.createElement("option");
            option.text = toTitleCase(cat);
            option.setAttribute('value', cat);
            
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

function populateForm (data) {
    document.getElementById('name').value = data.name;
    document.getElementById('address').value = data.address;
    document.getElementById('description').value = data.description;
    document.getElementById('website').value = data.website;
    document.getElementById('twitter').value = data.twitter;
    var select = document.getElementById('category');
    for(var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == data.category.toLowerCase()) {
            select.options[i].setAttribute('selected', 'selected');
        }
    }
}

function updateFormAction() {
    var id = getLocationIdFromUrl(),
        thisForm = document.getElementById('editForm'),
        formAction = thisForm.getAttribute("action");

    formAction += '/'+id;

    thisForm.action = formAction;

}