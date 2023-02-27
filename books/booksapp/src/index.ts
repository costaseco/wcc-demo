import http from 'http';
import { parse } from 'querystring';

const port = process.env.PORT || 8088;

const server = http.createServer((req, res) => {

    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch (path) {
        case '':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('HomePage');
            break;
        case '/about':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('About');
            break;
        case '/hello':
            switch(req.method) {
                case 'GET':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`
                    <h1>Hello, World!</h1>
                    <form method='POST'>
                        <input type="text" name="name" />
                    </form>
                    `);
                    break;
                case 'POST':
                    let body = ''
                    req.on('data', (data) => {
                        body += data
                    })
                    req.on('end', () => {
                        const name = parse(body).name
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.end(`<h1>Hello, ${name}!</h1>
                        <form method='POST'>
                            <input type="text" name="name" />
                        </form>
                        `);
                    })
                    break;
            }
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not Found');
            break;
    }
});

server.listen(port, () => {
    console.log(`Server running at port `+port);
});
