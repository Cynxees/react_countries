const corsAnywhere = require('cors-anywhere');
const http = require('http');

const proxy = corsAnywhere.createServer({
	originWhitelist: [], // Allow all origins
});

const server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') {
		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.write('Not Found');
		res.end();
		return;
	}

	proxy.emit('request', req, res);
});

const PORT = 4000;
server.listen(PORT, () => {
	console.log(`CORS Anywhere proxy server is running on port ${PORT}`);
});
