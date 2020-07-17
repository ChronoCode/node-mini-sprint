const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'Experience is the name everyone gives to their mistakes. -- Oscar Wilde',
  'Knowledge is power. -- Francis Bacon',
  'Fix the cause, not the symptom. -- Steve Maguire',
  'Before software can be reusable it first has to be usable. -- Ralph Johnson',
  'A person is smart. People are dumb, panicky dangerous animals... -- Agent K, Men In Black'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }

  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    let quote = quotes[getRandomInt(0, quotes.length)];
    res.writeHead(200, headers);
    res.write(quote);
    res.end();

  }
  // TODO: GET All Quotes
  else if ((req.url == '/quotes/' || req.url == '/quotes') && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify(quotes));
    res.end();

  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        quotes.push(body);
        res.writeHead(200, headers);
        res.write(body);
        res.end();
    });
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404, headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
