const server = Bun.serve({
  port: 5173,
  fetch(req) {
    const method = req.method;
    const url = new URL(req.url);
    console.log('url', url.pathname);

    if (url.pathname === '/' && method === 'GET')
      return new Response({
        home: 'home',
      });
    if (url.pathname === '/hello' && method === 'GET')
      return new Response(
        JSON.stringify({
          hello: 'hello1',
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    return new Response('404!');
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
