# Bamazon Application

---

## Getting Started

---

## Prerequisites

- Your favorite code editor...such as [Visual Studio Code](https://code.visualstudio.com/)
- Latest version [node.js](https://nodejs.org/en/)
- Latest version [MySQL Community Server](https://dev.mysql.com/downloads/) MySQL Workbench is also recommended, and installs from the web

---

## NODE Dependencies

[Dotenv](https://www.npmjs.com/package/dotenv) zero-dependency module that loads environment variables

[CLI Table](https://www.npmjs.com/package/cli-table) renders unicode-aided tables in the applications terminal

[Inquirer.js](https://www.npmjs.com/package/inquirer) collection of common interactive command line user interfaces

[MySQL](https://www.npmjs.com/package/mysql) node.js driver for mysql

---

## Installation

### Install dependencies
  > npm install

### Configure Environment Variables
Create a new file in the root directory named .env

Add the code below to the .env file, save, and close
```
    DB_HOST = <hostname>
    DB_PORT = 3030
    DB_USER = <your user name>
    DB_PASS = <your password>
```
Run seed.sql to create a database with the needed tables

## How to Use