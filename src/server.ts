import express from 'express';

const app = express();
const port = 3000;

const users = ['Sven', 'Michael', 'Axel', 'Daniel'];

/*app.get('/api/users/:name', (request, response) => {
  response.send(request.params.name);
});*/

app.get('/api/users/:name', (request, response) => {
  const isNameKnown = users.includes(request.params.name);
  if (isNameKnown) {
    response.send(request.params.name);
  } else {
    response.send('Error 404');
    console.error('404');
    response.status(404).send('Cant find that Castle');
  }
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (_request, response) => {
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
