//Adds list of projects at page load
/////////////////////////////////////////////////////////////////////////////////
function refresh() {
var req = new XMLHttpRequest();

req.open("get", "/photographers/all");

req.addEventListener("load", list_photographers);

req.responseType = "json";
req.send();
}

function list_photographers() {
  var ul = document.getElementById("all_photographers");
  reset_ul(ul);
  var select_delete = document.getElementById("delete_id");
  var select_update = document.getElementById("update_id");
  var select_photo = document.getElementById("photo_id");
  reset_select(select_delete);
  reset_select(select_update);
  reset_select(select_photo);
  for (var i = 0; i < this.response.length; i++) {
    add_photographer_to_list(ul, this.response[i].id, this.response[i].name);
    add_photographer_to_select(select_delete, this.response[i].id, this.response[i].name);
    add_photographer_to_select(select_update, this.response[i].id, this.response[i].name);
    add_photographer_to_select(select_photo, this.response[i].id, this.response[i].name);
  }
}

function add_photographer_to_list(ul, id, name) {
  var li = document.createElement("li");
  li.innerHTML = id + " - " + name;
  ul.appendChild(li);
}

function add_photographer_to_select(select, id, name) {
  var option = document.createElement("option");
  option.innerHTML = id + "-" + name;
  select.appendChild(option);
}

function reset_select(select) {
  while (select.firstChild) {
      select.removeChild(select.firstChild);
  }
}

function reset_ul(ul) {
  while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
  }
}


//Display photos for a selected photographer
////////////////////////////////////////////////////////////////////////////////
var photo_list = function() {
  var req = new XMLHttpRequest();
  var id = document.getElementById("photo_id").value.charAt(0);

  req.open("get", "/photographers/" + id + "/photos");

  req.addEventListener("load", function() {
    var column = document.getElementById("column2");
    reset_column(column);
    for (var i = 0; i < req.response.length; i++) {
      add_photo_div_to_column(column, req.response[i].name, req.response[i].url)
    }
  })

  req.responseType = "json";
  req.send();
}

function add_photo_div_to_column(column, name, url) {
  var div = document.createElement("div");
  var h3 = document.createElement("h3");
  var img = document.createElement("img");
  h3.innerHTML = name
  img.src = url;
  img.alt = "No Image Available";
  div.appendChild(h3);
  div.appendChild(img);
  column.appendChild(div);
}

function reset_column(column) {
  while (column.firstChild) {
      column.removeChild(column.firstChild);
  }
}

//Deletes a photographer
//////////////////////////////////////////////////////////////////////////
var delete_photographer = function() {
  var req = new XMLHttpRequest();
  var id = document.getElementById("delete_id").value.charAt(0);

  req.open("get", "/photographers/delete/" + id);

  req.addEventListener("load", function() {
    document.getElementById("delete_text").innerHTML = (req.response.name + " DELETED");
    refresh();
  })
  
  req.responseType = "json";
  req.send();

}

//Adds a project
////////////////////////////////////////////////////////////////////////
var add_photographer = function() {
  var req = new XMLHttpRequest();
  var name = document.getElementById("photographer_name").value;

  var string = "/photographers/add?name=" + name;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("added_text").innerHTML = (req.response.name + " ADDED");
    
    var ul = document.getElementById("all_photographers");
    add_photographer_to_list(ul, req.response.id, req.response.name);
    
    var select_delete = document.getElementById("delete_id");
    var select_update = document.getElementById("update_id");
    var select_photo = document.getElementById("photo_id");
    add_photographer_to_select(select_delete, req.response.id, req.response.name);
    add_photographer_to_select(select_update, req.response.id, req.response.name);
    add_photographer_to_select(select_photo, req.response.id, req.response.name);
    
    document.getElementById("photographer_name").value = "";
  })

  req.responseType = "json";
  req.send();
}

//Updates a photographers name
////////////////////////////////////////////////////////////////////////
var update_photographer = function() {
  var req = new XMLHttpRequest();
  var name = document.getElementById("update_photographer_name").value;
  var id = document.getElementById("update_id").value.charAt(0);

  var string = "/photographers/update?name=" + name + "&id=" +id;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("update_text").innerHTML = (req.response.name + " UPDATED");
    refresh();
    document.getElementById("update_photographer_name").value = "";
  })

  req.responseType = "json";
  req.send();
}
//
//Sets event actions
/////////////////////////////////////////////////////////////////////
window.onload = function() {
  refresh();
  document.getElementById("delete").addEventListener("click", delete_photographer);
  document.getElementById("add").addEventListener("click", add_photographer);
  document.getElementById("update").addEventListener("click", update_photographer);
  document.getElementById("photo_list").addEventListener("click", photo_list);
}
//////////////////////////////////////////////////////////////////////
