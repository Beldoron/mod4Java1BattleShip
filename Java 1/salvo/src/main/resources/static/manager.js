

$(function() {

  // display text in the output area
  function showOutput(text) {
    $("#output").text(text);
  }

  // load and display JSON sent by server for /players

  function loadData() {
    $.get("/players")
    .done(function(data) {
      showOutput(JSON.stringify(data, null, 2));
    })
    .fail(function( jqXHR, textStatus ) {
      showOutput( "Failed: " + textStatus );
    });
  }

  // handler for when user clicks add person

  function addPlayer() {
    var name = $("#email").val();
    if (name) {
      postPlayer(name);
    }
  }

  // code to post a new player using AJAX
  // on success, reload and display the updated data from the server

  function postPlayer(userName) {
    $.post({
      headers: {
          'Content-Type': 'application/json'
      },
      dataType: "text",
      url: "/players",
      data: JSON.stringify({ "userName": userName })
    })
    .done(function( ) {
      showOutput( "Saved -- reloading");
      loadData();
    })
    .fail(function( jqXHR, textStatus ) {
      showOutput( "Failed: " + textStatus );
    });
  }

  $("#add_player").on("click", addPlayer);

  loadData();
});

/*  function to display date

var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;

*/