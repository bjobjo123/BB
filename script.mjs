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

server.get("/", getRoot);
server.get("/tmp/poem", getPoem);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});