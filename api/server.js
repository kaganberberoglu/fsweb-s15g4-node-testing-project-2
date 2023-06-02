const express = require("express");
const missionRouter = require("./missions/mission-router");
const taskRouter = require("./tasks/task-router");

const server = express();

server.use(express.json());

server.use("/api/mission", missionRouter);
server.use("/api/task", taskRouter);

module.exports = server;
