const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = "Authentication";

let users = [];
let scores = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// request body: username, password
// return body: none
apiRouter.post("/auth/create", async (req, res) => {
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
  const user = await getUser("username", req.body.username);
  if (!user || (await bcrypt.compare(req.body.password, user.password))) {
    res.status(401).send({ msg: "unauthorized" });
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

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

// TODO:
// function createUser
// function getUser

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
