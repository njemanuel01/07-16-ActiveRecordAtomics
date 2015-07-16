//Adds list of projects at page load
/////////////////////////////////////////////////////////////////////////////////
var req = new XMLHttpRequest();

req.open("get", "/photographers/all");

req.addEventListener("load", list_photographers);

req.responseType = "json";
req.send();

function list_photographers() {
  var ul = document.getElementById("all_photographers");
  reset_ul(ul);
  var select_delete = document.getElementById("delete_id");
  var select_update = document.getElementById("update_id");
  var select_photo = document.getElementById("photo_id");
  reset_select(select_delete);
  reset_select(select_update);
  reset_select(select_photo);
  for (var i = 0; i < req.response.length; i++) {
    add_photographer_to_list(ul, req.response[i].id, req.response[i].name);
    add_photographer_to_select(select_delete, req.response[i].id, req.response[i].name);
    add_photographer_to_select(select_update, req.response[i].id, req.response[i].name);
    add_photographer_to_select(select_photo, req.response[i].id, req.response[i].name);
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

//
// //Display all links in the database
// ////////////////////////////////////////////////////////////////////////////////
// var all_links = function() {
//   var req = new XMLHttpRequest();
//   var names = [];
//
//   req.open("get", "http://localhost:4567/links");
//
//   req.addEventListener("load", function() {
//     var ul = document.getElementById("links_all");
//     for (var i = 0; i < req.response.length; i++) {
//       var li = document.createElement("li");
//       var a = document.createElement("a");
//       a.setAttribute("href", req.response[i].link);
//       a.appendChild(document.createTextNode(req.response[i].link));
//       li.appendChild(a);
//       ul.appendChild(li);
//     }
//   })
//
//   req.responseType = "json";
//   req.send();
// }
// //////////////////////////////////////////////////////////////////////////
//
//


//Deletes a photographer
//////////////////////////////////////////////////////////////////////////
var delete_photographer = function() {
  var req = new XMLHttpRequest();
  var id = document.getElementById("delete_id").value.charAt(0);

  req.open("get", "/photographers/delete/" + id);

  req.addEventListener("load", function() {
    document.getElementById("delete_text").innerHTML = (req.response.name + " DELETED");
  })

  list_photographers();

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
    add_list_item_to_projects(req.response.id, req.response.name);
    add_item_to_select(req.response.id, req.response.name);
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
  var id = document.getElementById("delete_id").value.charAt(0);

  var string = "/photographers/update?name=" + name + "&id=" +id;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("update_text").innerHTML = (req.response.name + " ADDED");
    list_photographers();
    document.getElementById("photographer_name").value = "";
  })

  req.responseType = "json";
  req.send();
}
//
//Sets event actions
/////////////////////////////////////////////////////////////////////
window.onload = function() {
  document.getElementById("delete").addEventListener("click", delete_photographer);
  document.getElementById("add").addEventListener("click", add_photographer);
  document.getElementById("update").addEventListener("click", update_photographer);
}
//////////////////////////////////////////////////////////////////////
