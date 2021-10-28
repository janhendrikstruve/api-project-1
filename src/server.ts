import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

//Middleware for parsind application/jason
app.use(express.json());

//Middleware for parsing cookies
app.use(cookieParser());

const users = [
  {
    name: 'Manuel',
    username: 'manuel123',
    password: '123abc',
  },
  {
    name: 'Leon',
    username: 'lmachens',
    password: 'asdc',
  },
  {
    name: 'Anke',
    username: 'anke9000',
    password: 'ab',
  },
  {
    name: 'Philipp',
    username: 'phgrtz',
    password: 'pw123!',
  },
];

app.get('/api/me', (request, response) => {
  const username = request.cookies.username;
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    response.send(foundUser);
  } else {
    response.status(404).send('User not found');
  }
});

// app.post('/api/users/login', (request, response) => {
//   const loginRequest = request.body;
//   const
//   if (users.some((user) => user.name) === loginRequest.name) {
//     const expectedPassword = users.find((user) => user.password === loginRequest.password)
//       .map((user) => user.password);
//       if (users.some((user) => user.password) === expectedPassword) {
//         users.find((user) => user.username === loginRequest.username);
//         response.send('Wrong Password!');
//       } else {
//         response.send('Wrong Password!');
//         return;
//   } else {
//     response.send('Wrong Username!');
//     return;
//   }
//   if (users.some((user) => user.password) === expectedPassword) {
//     users.find((user) => user.username === loginRequest.username);
//     response.send('Wrong Password!');
//   } else {
//     response.send('Wrong Password!');
//     return;
//   }
// });

app.post('/api/login', (request, response) => {
  const userLogin = request.body;
  const userLoginName = users.find(
    (user) => user.username === userLogin.username
  );
  const userPassword = users.findIndex(
    (user) => user.username === userLogin.username
  );
  if (userLoginName) {
    if (userLogin.password === users[userPassword].password) {
      response.setHeader('Set-Cookie', `username=${userLoginName.username}`);
      response.send('It worked');
    } else {
      response.status(401).send('Password is wrong');
    }
  } else {
    response.status(409).send('User does not exist');
  }
});

app.post('/api/users/', (request, response) => {
  const newUser = request.body;
  if (
    typeof newUser.name !== 'string' ||
    typeof newUser.username !== 'string' ||
    typeof newUser.password !== 'string'
  ) {
    response.status(400).send('Missing properties');
  }
  if (users.some((user) => user.username === newUser.username)) {
    response.status(403).send('The User you want to include already exists');
  } else {
    users.push(newUser);
    response.send(newUser.name + ' added');
  }
});

//delete function version 1

// app.delete('/api/users/:username', (request, response) => {
//   const foundUser = users.find(
//     (user) => user.username === request.params.username
//   );
//   if (foundUser) {
//     response.send('DELETE exist');
//     users = users.filter(
//       (stayingUser) => stayingUser.username !== request.params.username
//     );
//   } else {
//     console.error('404');
//     response.status(404).send('Cant find that Castle');
//   }
// });

//alternative version 2 (only with let variable)

app.delete('/api/users/:username', (request, response) => {
  const isUserKnown = users.findIndex(
    (user) => user.username === request.params.username
  );
  if (isUserKnown !== -1) {
    users.splice(isUserKnown, 1);
    response.send('DELETE exist');
  } else {
    console.error('404');
    response.status(404).send('Cant find that Castle');
  }
});

app.get('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    response.send(user);
  } else {
    response.status(404).send('This page is not here. Check another Castle 🏰');
  }
});

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
