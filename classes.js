"use strict";

var getById = function (id) { return document.getElementById(id); };
var filterBtns = document.getElementsByClassName("btn-filter");
var csuClasses = [];
var request;

// adds active button color
var addBtnClass = function(btn) {
    btn.classList.add("btn-clicked");
}

// adds classes to table
var addClassToTable = function(csuClass, table) {
    table.innerHTML += "<tr><td>" + csuClass.prefix + "-" + csuClass.number + "</td><td>" + csuClass.name + "</td></tr>";
}

// clears table content
var clear = function() {
    getById("table-body").innerHTML ="";
}

// filters classes by lower/upper
var division = function() {
    var table = getById("table-body");
    clear();
    removeBtnClass();
    addBtnClass(this);

    if (this.id === "btn-lower") {
        for (var i = 0; i < csuClasses.length; i++) {
            if (csuClasses[i].number.charAt(0) === "1" || csuClasses[i].number.charAt(0) === "2") {
                addClassToTable(csuClasses[i], table);
            }
        }
    }
    else {
        for (var i = 0; i < csuClasses.length; i++) {
            if (csuClasses[i].number.charAt(0) === "3" || csuClasses[i].number.charAt(0) === "4") {
                addClassToTable(csuClasses[i], table);
            }
        }
    }
}

// filters focus areas
var prefix = function() {
    var prefixClicked;
    var table = getById("table-body");
    clear();
    removeBtnClass();
    addBtnClass(this);

    if (this.id === "btn-systems") {
        prefixClicked = "CIS";
    }
    else if (this.id === "btn-science") {
        prefixClicked = "CS";
    }
    else {
        prefixClicked = "CT";
    }

    for (var i = 0; i < csuClasses.length; i++) {
        if (csuClasses[i].prefix === prefixClicked) {
            addClassToTable(csuClasses[i], table);
        }
    }
}

// removes active button color
var removeBtnClass = function() {
    for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].classList.remove("btn-clicked");
    }
}

// clears table content and reloads table
var reset = function() {
    clear();
    updateTable(request.responseText);
    if (this.id === "btn-reset") {
        removeBtnClass();
    }
}

// on page load
var updateTable = function(responseText) {
    var table = getById("table-body");
    csuClasses = JSON.parse(responseText);
    for (var i = 0; i < csuClasses.length; i++) {
        var csuClass = csuClasses[i];
        addClassToTable(csuClasses[i], table);
    }
}

window.onload = function() {
    getById("btn-systems").onclick = prefix;
    getById("btn-science").onclick = prefix;
    getById("btn-technology").onclick = prefix;
    getById("btn-lower").onclick = division;
    getById("btn-upper").onclick = division;
    getById("btn-reset").onclick = reset;

    var url = "http://localhost:8888/projects/csu/classes.json";
    //var url = "http://www.keithsportfolio.com/classes.json";
    request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status === 200) {
            updateTable(request.responseText);
        }
    };
    request.send(null);
}
