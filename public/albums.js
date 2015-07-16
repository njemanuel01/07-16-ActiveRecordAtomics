//Adds list of projects at page load
/////////////////////////////////////////////////////////////////////////////////
function refresh() {
var req = new XMLHttpRequest();

req.open("get", "/albums/all");

req.addEventListener("load", list_albums);

req.responseType = "json";
req.send();
}

function list_albums() {
  var ul = document.getElementById("all_albums");
  reset_ul(ul);
  var select_delete = document.getElementById("delete_id");
  var select_update = document.getElementById("update_id");
  var select_photo = document.getElementById("photo_id");
  reset_select(select_delete);
  reset_select(select_update);
  reset_select(select_photo);
  for (var i = 0; i < this.response.length; i++) {
    add_album_to_list(ul, this.response[i].id, this.response[i].name);
    add_album_to_select(select_delete, this.response[i].id, this.response[i].name);
    add_album_to_select(select_update, this.response[i].id, this.response[i].name);
    add_album_to_select(select_photo, this.response[i].id, this.response[i].name);
  }
}

function add_album_to_list(ul, id, name) {
  var li = document.createElement("li");
  li.innerHTML = id + " - " + name;
  ul.appendChild(li);
}

function add_album_to_select(select, id, name) {
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

  req.open("get", "/albums/" + id + "/photos");

  req.addEventListener("load", function() {
    var ul = document.getElementById("photo_ul");
    reset_ul(ul);
    for (var i = 0; i < req.response.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute("href", req.response[i].url);
      a.innerHTML = req.response[i].name;
      li.appendChild(a);
      ul.appendChild(li);
    }
  })

  req.responseType = "json";
  req.send();
}



//Deletes a photographer
//////////////////////////////////////////////////////////////////////////
var delete_album = function() {
  var req = new XMLHttpRequest();
  var id = document.getElementById("delete_id").value.charAt(0);

  req.open("get", "/albums/delete/" + id);

  req.addEventListener("load", function() {
    document.getElementById("delete_text").innerHTML = (req.response.name + " DELETED");
    refresh();
  })
  
  req.responseType = "json";
  req.send();

}

//Adds a project
////////////////////////////////////////////////////////////////////////
var add_album = function() {
  var req = new XMLHttpRequest();
  var name = document.getElementById("album_name").value;

  var string = "/albums/add?name=" + name;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("added_text").innerHTML = (req.response.name + " ADDED");
    
    var ul = document.getElementById("all_albums");
    add_album_to_list(ul, req.response.id, req.response.name);
    
    var select_delete = document.getElementById("delete_id");
    var select_update = document.getElementById("update_id");
    var select_photo = document.getElementById("photo_id");
    add_album_to_select(select_delete, req.response.id, req.response.name);
    add_album_to_select(select_update, req.response.id, req.response.name);
    add_album_to_select(select_photo, req.response.id, req.response.name);
    
    document.getElementById("album_name").value = "";
  })

  req.responseType = "json";
  req.send();
}

//Updates a photographers name
////////////////////////////////////////////////////////////////////////
var update_album = function() {
  var req = new XMLHttpRequest();
  var name = document.getElementById("update_album_name").value;
  var id = document.getElementById("delete_id").value.charAt(0);

  var string = "/albums/update?name=" + name + "&id=" +id;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("update_text").innerHTML = (req.response.name + " UPDATED");
    refresh();
    document.getElementById("album_name").value = "";
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