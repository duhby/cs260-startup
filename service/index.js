const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookie = "Authentication";

let users = [];
let scores = [];

app.use(express.static("public"));
