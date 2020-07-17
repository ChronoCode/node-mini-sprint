$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  $('#getAll').click((e) => {
    e.preventDefault();
    getAllQuotes();
  });

  function getQuote(){
    //YOUR CODE HERE, Add a GET request
    $.get('http://localhost:3000/quote', (data) => {
      let $data = `<div>${data}</div>`;

      $('#response').html('');
      $('#response').append($data);
    });
  }

  function getAllQuotes(){
    //YOUR CODE HERE, Add a GET request
    $.get('http://localhost:3000/quotes', (data) => {
      $('#response').html('');
      let quotes = JSON.parse(data);
      quotes.forEach(function (quote) {
        let $quote = `<div>${quote}</div>`;
        $('#response').append($quote);
      });
    });
  }

  function addQuote(quote){
    //YOUR CODE HERE, Add a POST request
    $.post( 'http://localhost:3000/quote', quote, response => {
      $('#quote').html('');
      $('#quote').append(`Thank you for adding the quote: "${response}"`);
    });
  }
});
