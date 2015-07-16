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
///////////////////////////////////////////////////////////////////////////////////

//Displays information on a singe project
//////////////////////////////////////////////////////////////////////////////////
// var single_project = function() {
//   var req = new XMLHttpRequest();
//
//   req.open("get", this.href);
//
//   req.addEventListener("load", function() {
//     document.getElementById("title").innerHTML = req.response.name;
//     document.getElementById("description").innerHTML = req.response.description;
//
//     var ul = document.getElementById("links");
//     reset_ul(ul);
//     for (var i = 0; i < req.response.links.length; i++) {
//       var li = document.createElement("li");
//       var a = document.createElement("a");
//       a.setAttribute("href", req.response.links[i].link);
//       a.appendChild(document.createTextNode(req.response.links[i].link));
//       li.appendChild(a);
//       ul.appendChild(li);
//     }
//
//     var ul = document.getElementById("co-workers");
//     reset_ul(ul);
//     for (var i = 0; i < req.response.members.length; i++) {
//       var li = document.createElement("li");
//       li.appendChild(document.createTextNode("Co-Worker: " + req.response.members[i].name));
//       ul.appendChild(li);
//     }
//
//   })
//   event.preventDefault();
//   req.responseType = "json";
//   req.send();
//
// }
//
// ////////////////////////////////////////////////////////////////////////////////
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
// //Displays all members
// //////////////////////////////////////////////////////////////////////////
// var all_members = function() {
//   var req = new XMLHttpRequest();
//
//   req.open("get", "http://localhost:4567/members");
//
//   req.addEventListener("load", function() {
//     var ul = document.getElementById("members_all");
//     for (var i = 0; i < req.response.length; i++) {
//       var li = document.createElement("li");
//       li.appendChild(document.createTextNode("Co-Worker: " + req.response[i].name));
//       ul.appendChild(li);
//     }
//   })
//
//   req.responseType = "json";
//   req.send();
// }
// ///////////////////////////////////////////////////////////////////////////
//
// //Deletes a project
// //////////////////////////////////////////////////////////////////////////
// var delete_project = function() {
//   var req = new XMLHttpRequest();
//   var id = document.getElementById("delete_id").value.charAt(0);
//   var links = [];
//   var members = [];
//
//   req.open("get", "http://localhost:4567/projects/delete/" + id);
//
//   req.addEventListener("load", function() {
//     document.getElementById("delete_text").innerHTML = (req.response.name + " DELETED");
//   })
//
//   list_projects();
//
//   req.responseType = "json";
//   req.send();
//
// }
// /////////////////////////////////////////////////////////////////////////
//
// //Adds a project
// ////////////////////////////////////////////////////////////////////////
// var add_project = function() {
//   var req = new XMLHttpRequest();
//   var name = document.getElementById("project_name").value;
//   var description = document.getElementById("project_description").value;
//   var link1 = document.getElementById("project_link1").value;
//   var link2 = document.getElementById("project_link2").value;
//   var link3 = document.getElementById("project_link3").value;
//   var member1 = document.getElementById("project_member1").value;
//   var member2 = document.getElementById("project_member2").value;
//
//   var string = "http://localhost:4567/projects/add?name=" + name + "&description=" + description + "&link1=" + link1 +
//   "&link2=" + link2 + "&link3=" + link3 + "&member1=" + member1 + "&member2=" + member2
//   req.open("get", string);
//
//   req.addEventListener("load", function() {
//     document.getElementById("added_text").innerHTML = (req.response.name + " ADDED");
//     add_list_item_to_projects(req.response.id, req.response.name);
//     add_item_to_select(req.response.id, req.response.name);
//     document.getElementById("project_name").value = "";
//     document.getElementById("project_description").value = "";
//     document.getElementById("project_link1").value = "";
//     document.getElementById("project_link2").value = "";
//     document.getElementById("project_link3").value = "";
//     document.getElementById("project_member1").value = "";
//     document.getElementById("project_member2").value = "";
//   })
//
//   req.responseType = "json";
//   req.send();
// }
// /////////////////////////////////////////////////////////////////////
//
// //Sets event actions
// /////////////////////////////////////////////////////////////////////
// window.onload = function() {
//   $("#all_links").on("click", all_links);
//   document.getElementById("all_members").addEventListener("click", all_members);
//   document.getElementById("delete_project").addEventListener("click", delete_project);
//   document.getElementById("add_project").addEventListener("click", add_project);
// }
// //////////////////////////////////////////////////////////////////////
