import express from 'express';

const app = express();
const port = 3000;

app.get('/api/users/:name', (request, response) => {
  response.send(request.params.name);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (_request, response) => {
  const users = ['Sven', 'Michael', 'Axel'];
  response.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/api/users/:name', (_request, response) => {
//   response.send('Leon');
// });

// app.get('/api/users', (_request, response) => {
//   const users = ['Manuel', 'Leon', 'Anke'];
//   response.send(users);
// });

// app.get('/', (_req, res) => {
//   res.send('Hello World 🐱‍👤!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
