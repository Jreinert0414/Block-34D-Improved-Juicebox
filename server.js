require('dotenv').config();
const express = require('express');
const server = express();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));





server.use("/auth", require('./auth'));
server.use('/api', require('./api'));

const { client } = require('./db');

module.exports = server