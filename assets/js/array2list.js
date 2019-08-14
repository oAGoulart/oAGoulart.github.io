// http GET requests handler
var HttpClient = function()
{
  this.get = function(aUrl, aCallback)
  {
    var anHttpRequest = new XMLHttpRequest();

    anHttpRequest.onreadystatechange = function()
    {
      if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200) {
         aCallback(anHttpRequest.responseText);
      }
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

// create http client
var client = new HttpClient();

// get database events
client.get("https://oagoulart.firebaseio.com/.json", function(response) {
  // append the contents of the JSON request to the post
  var obj = document.createElement("span");

  obj.appendChild(document.createTextNode(JSON.stringify(JSON.parse(response), null, "\t")));

  document.getElementById("events").appendChild(obj);
});
