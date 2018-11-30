var categories = [];
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

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

function createCategoryIfNotExist(cat) {
    if (!categories.includes(cat)) {
        categories.push(cat);
    }
}

function createCategoryList() {
    var filterListEle = document.getElementById('filter-list');
    var uniqueCategories = sortCategories(categories);

    uniqueCategories.forEach(function(cat) {
        if (cat != ''){
            var option = document.createElement("option");
               var x = document.getElementById("category");
                option.text = toTitleCase(cat);
                x.add(option);
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

function sortCategories(categories) {
  var categoriesLowerCase = [];
  var uniqueCategories = [];

  for (var i = 0; i < categories.length; i++) {
    categoriesLowerCase.push(categories[i].toLowerCase());
  }

  for (var i = 0; i < categoriesLowerCase.length; i++) {
      if(!uniqueCategories.includes(categoriesLowerCase[i])) uniqueCategories.push(categoriesLowerCase[i]);
  }
  return uniqueCategories.sort();
}

window.onload = function () {
    getJSON('//maps.walthamstuff.com/api/index.php/locations', function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                data.forEach(function(element) {
                    createCategoryIfNotExist(element.category);
                  });
                  createCategoryList();
                
            }
        });
}