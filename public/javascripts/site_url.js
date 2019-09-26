var url = window.location.href; //   http://localhost:3000/admin/dashboard
var protocol = url.split("/")[0];
var host = url.split("/")[2];
var urlPath = url.split("/")[3];
var apiURL = protocol + "//" + host + "/" + urlPath + "/";