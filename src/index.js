import router from './router.js'

Bun.serve({
  port: 36107,
  fetch: async (request) => router(request),
});

console.log("Run on http://localhost:36107");
