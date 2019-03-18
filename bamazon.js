
require("dotenv").config();
const mysql = require("mysql");
const Table = require('cli-table');
var prompt = require("./prompts");

prompt.storeFront();
