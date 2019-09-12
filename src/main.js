import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Dictionary } from './definition-gif';
import { GiphyGenerator } from './definition-gif';

$(document).ready(function() {
  $('#submit').click(function() {
    let userWord = $("#searchWord").val();
    let defWords = [];


    let defSearch = new Dictionary();
    let giphyGenerator = new GiphyGenerator(); // create instance of WeatherService class. Change these values to custom your page.
    let promise = defSearch.getDefinition(userWord);  // call the instance method and pass in user input.

    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);

      defWords = body[0].meta.syns[0];
      console.log(defWords);

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

    promise.then(function() {
      $('.giphy').html("");
      for(let i=0; i<defWords.length; i++) {

        let promise2 = giphyGenerator.searchGifs(defWords[i]);

        promise2.then(function(response) {
          const body = JSON.parse(response);
          //target the img value and display with a img src to display

          $('.giphy').append(`<img src=${body.data[0].images.original.url}>`);


        }, function(error) {
          $('.showErrors').text(`There was an error processing your request: ${error.message}`);
        });
      }

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });



  });

});
