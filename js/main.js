$(document).ready(function() {
  document.getElementById("mySearch").onkeypress=function(event) {
    if (event.which == 13 || event.keyCode == 13) { //if user presses enter key
      if (document.getElementById("mySearch").value === '') {
        $("#article-container").animate({opacity: 0.0}, 200, function(){
          document.getElementById("article-container").style.visibility = "hidden";
        });   
        setLayout();  
      } else {
        var x = document.getElementById("mySearch").value;
        $.ajax({
          url: "https://en.wikipedia.org/w/api.php?    action=query&generator=search&gsrnamespace=0&indexpageids&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&format=json&gsrsearch=" + x,
          dataType: "jsonp",
          jsonpCallback: "interpretData"
        }); //ajax request
        setLayout();
        $("#article-container").css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0}, 2000);
      } // if/else statement
    } //if statement
  }; //on submit
}); //doc ready


//Moves search input and random article link to upper page to make room for wikipedia article container
function setLayout() {
  document.getElementById("instruction").style.display = "none"; //hides instruction paragraph
  document.getElementsByTagName("body")[0].style.cssText += 'padding-top: 3em; padding-bottom: 2em;';
}

//Receives ajax data and places data in appropriate containers
function interpretData(data) {
  var titles = [];
  var extracts = [];
  var ids = [];
  for (var i = 0; i < data.query.pageids.length; i++) {
    titles.push(data.query.pages[data.query.pageids[i]].title);
    extracts.push(data.query.pages[data.query.pageids[i]].extract);
    ids.push(data.query.pageids[i]);
  }
  $("h4[class='title']").each(function(i){
    $(this).html(titles[i]);
  });
  $("p[class='extract']").each(function(i){
    $(this).html(extracts[i]);
  });
  $("a[class='wikiLink']").each(function(i){
    $(this).attr("href", "https://en.wikipedia.org/?curid="+ids[i]);
  });
};//close function








