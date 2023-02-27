import http from 'http';

const port = process.env.PORT || 8088;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, () => {
    console.log(`Server running at port `+port);
});
