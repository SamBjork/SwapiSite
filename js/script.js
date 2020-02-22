document.getElementById("search-btn").addEventListener("click", callAPI);


function getRandomInt(max) {
    return Math.floor((Math.random() * max) + 1);
}

function callAPI() {

    $('#spinner').show();

    let randomNum = getRandomInt(87);

    $.ajax({
        url: "https://swapi.co/api/people/" + randomNum,
        success: function (result) {
          
          $("#person").empty();
          $("#person").html(result.name);
          const upper = result.gender.replace(/^\w/, c => c.toUpperCase());
          $("#gender").empty();
          $("#gender").html(upper);
          let planetURL = result.homeworld;
          $("#homePlanet").empty();
          $.ajax({
              url: planetURL,
              success: function (planetresult) {
                  $("#homePlanet").html(planetresult.name);
              }
          });
          $("#movieList").empty();
          if (result.films.length > 0) {
              for (var i = 0; i < result.films.length; i++) {
                  var movieURL = result.films[i];
                  $.ajax({
                      url: movieURL,
                      success: function (newResult) {
                          $("#movieList").append("<li>" + newResult.title + "</li>");
                      }
                  });
              }
          }
          $('html, body').animate({
              scrollTop: $("#all-info").offset().top
          }, 2000);
          $('#spinner').hide();
        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + xhr.status);
        }
    });
}
