//Adds list of projects at page load
/////////////////////////////////////////////////////////////////////////////////
function refresh() {
  var req = new XMLHttpRequest();

  req.open("get", "/photos/all");

  req.addEventListener("load", list_photos);

  req.responseType = "json";
  req.send();
}

function list_photos() {
  var ul = document.getElementById("all_photos");
  reset_ul(ul);
  var select_delete = document.getElementById("delete_id");
  var select_update = document.getElementById("update_id");
  var select_album = document.getElementById("photo_to_album_id");
  reset_select(select_delete);
  reset_select(select_update);
  reset_select(select_album);
  for (var i = 0; i < this.response.length; i++) {
    var column = document.getElementById("column" + ((i % 3) + 1))
    add_photo_div_to_column(column, this.response[i].name, this.response[i].url)
    // add_photo_to_list(ul, this.response[i].id, this.response[i].name);
    add_photo_to_select(select_delete, this.response[i].id, this.response[i].name);
    add_photo_to_select(select_update, this.response[i].id, this.response[i].name);
    add_photo_to_select(select_album, this.response[i].id, this.response[i].name);
  }
}

function add_photo_to_list(ul, id, name) {
  var li = document.createElement("li");
  li.innerHTML = id + " - " + name;
  ul.appendChild(li);
}

function add_photo_to_select(select, id, name) {
  var option = document.createElement("option");
  option.innerHTML = id + "-" + name;
  select.appendChild(option);
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

//Deletes a photographer
//////////////////////////////////////////////////////////////////////////
var delete_photo = function() {
  var req = new XMLHttpRequest();
  var id = document.getElementById("delete_id").value.charAt(0);

  req.open("get", "/photos/delete/" + id);

  req.addEventListener("load", function() {
    document.getElementById("delete_text").innerHTML = (req.response.name + " DELETED");
    refresh();
  })
  
  req.responseType = "json";
  req.send();

}

//Adds a project
////////////////////////////////////////////////////////////////////////
var add_photo = function() {
  var req = new XMLHttpRequest();
  var name = document.getElementById("photo_name").value;
  var url = document.getElementById("photo_url").value;
  var photographer_id = document.getElementById("photographer_id").value;

  var string = "/photos/add?name=" + name + "&url=" + url +"&photographer_id=" + photographer_id;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("added_text").innerHTML = (req.response.name + " ADDED");
    
    var ul = document.getElementById("all_photos");
    add_photo_to_list(ul, req.response.id, req.response.name);
    
    var select_delete = document.getElementById("delete_id");
    var select_update = document.getElementById("update_id");
    var select_album = document.getElementById("photo_to_album_id");
    add_photo_to_select(select_delete, req.response.id, req.response.name);
    add_photo_to_select(select_update, req.response.id, req.response.name);
    add_photo_to_select(select_album, req.response.id, req.response.name);
    
    document.getElementById("photo_name").value = "";
    document.getElementById("photo_url").value = "";
    document.getElementById("photographer_id").value = "";
  })

  req.responseType = "json";
  req.send();
}

//Updates a photographers name
////////////////////////////////////////////////////////////////////////
var update_photo = function() {
  var req = new XMLHttpRequest();
  var name = document.getElementById("update_photo_name").value;
  var url = document.getElementById("update_photo_url").value;
  var photographer_id = document.getElementById("update_photographer_id").value;
  var id = document.getElementById("update_id").value;

  var string = "/photos/update?name=" + name + "&id=" + id + "&url=" + url + "&photographer_id=" + photographer_id;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("update_text").innerHTML = (req.response.name + " UPDATED");
    refresh();
    document.getElementById("update_photo_name").value = "";
    document.getElementById("update_photo_url").value = "";
    document.getElementById("update_photographer_id").value = "";
  })

  req.responseType = "json";
  req.send();
}

//Adds a photo to an album
function photo_to_album(){
  var req = new XMLHttpRequest();
  var photo_id = document.getElementById("photo_to_album_id").value.charAt(0);
  var album_id = document.getElementById("album_to_photo_id").value;

  var string = "/photos/photoalbum?photo_id=" + photo_id + "&album_id=" + album_id;
  req.open("get", string);

  req.addEventListener("load", function() {
    document.getElementById("album_text").innerHTML = (req.response.name + " added to album");
    document.getElementById("album_to_photo_id").value = "";
  })

  req.responseType = "json";
  req.send();
}
//
//Sets event actions
/////////////////////////////////////////////////////////////////////
window.onload = function() {
  refresh();
  document.getElementById("delete").addEventListener("click", delete_photo);
  document.getElementById("add").addEventListener("click", add_photo);
  document.getElementById("update").addEventListener("click", update_photo);
  document.getElementById("photo_to_album").addEventListener("click", photo_to_album);
}
//////////////////////////////////////////////////////////////////////