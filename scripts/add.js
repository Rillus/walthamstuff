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

window.onload = function () {
    getJSON('api/index.php/locations', function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            data.forEach(function(element) {
                createUniqueCategoryList(element.category);
            });
            createCategoryList();
        }
    });
};
