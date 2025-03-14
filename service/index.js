const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = "Authorization";

let users = [];
let scores = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const authMiddleware = async (req, res, next) => {
  const user = await getUser("token", req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: "unauthorized" });
  }
};

// request body: username, password
// return body: none
apiRouter.post("/auth/create", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ msg: "missing username or password" });
    return;
  }
  if (await getUser("username", req.body.username)) {
    res.status(409).send({ msg: "username taken" });
    return;
  }
  const user = await createUser(req.body.username, req.body.password);
  setAuthCookie(res, user.token);
  res.status(204).end();
});

// request body: username, password
// return body: none
apiRouter.post("/auth/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ msg: "missing username or password" });
    return;
  }
  const user = await getUser("username", req.body.username);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    res.status(401).send({ msg: "unauthorized" });
    return;
  }
  user.token = uuid.v4();
  setAuthCookie(res, user.token);
  res.status(204).end();
});

apiRouter.post("/auth/logout", async (req, res) => {
  const user = await getUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// request body: none
// return body: scores
apiRouter.get("/scores", async (_req, res) => {
  res.send(scores);
});

// request body: score
// return body: none
apiRouter.post("/scores", authMiddleware, async (req, res) => {
  if (!req.body.score) {
    res.status(400).send({ msg: "missing score" });
    return;
  }
  const score = {
    username: req.user.username, // middleware sets the user
    score: req.body.score,
    date: new Date().toISOString(),
  };
  const existingScore = scores.find((s) => s.username === score.username);
  if (existingScore) {
    if (score.score <= existingScore.score) {
      res.status(409).send({ msg: "not a high score" });
      return;
    }
    existingScore.score = score.score;
    existingScore.date = score.date;
  } else {
    scores.push(score);
  }
  scores.sort((a, b) => b.score - a.score);
  res.status(204).end();
});

// Error handling
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username.toLowerCase(),
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);
  return user;
}

async function getUser(field, value) {
  if (!value) return null;
  return users.find((user) => user[field] === value);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
