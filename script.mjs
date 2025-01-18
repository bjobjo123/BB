import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';


const server = express();
const port = (process.env.PORT || 8000);

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

function getPoem(req, res, next) {
    const poem = "roser er røde, fioler er blå. og noe mer kommer her å ";
    res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();
}

function getQuote (req, res, next) {
    const quotes = [
        "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
        "The way to get started is to quit talking and begin doing. -Walt Disney",
        "You must be the change you wish to see in the world. -Mahatma Gandhi",
        "In this life we cannot do great things. We can only do small things with great love. -Mother Teresa",
        "Many of life's failures are people who did not realize how close they were to success when they gave up. -Thomas A. Edison"
    ]
    res.status(HTTP_CODES.SUCCESS.OK).send(quotes[Math.floor(a.length * Math.random())]).end();
}

function postSum (req, res, next) { 

const sum = {a,b} = req.params;
const sumert =sum[1] + sum[2];

res.status(HTTP_CODES.SUCCESS.OK).send({ sumert }).end();
}


server.get("/", getRoot);
server.get("/tmp/poem", getPoem);
server.get("/tmp/quotes", getQuote);
server.post("/tmp/sum/a/b",postSum );


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});