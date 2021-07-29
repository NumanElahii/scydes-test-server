const express = require("express");
const {
  getUniqueID,
  sendMessage,
  sendMessageById,
  sendMessageExceptOneById,
} = require("./utils/methods");
const { typesDef, exploitationEvents } = require("./types");
// const data = require('./utils/data')
const { infoGathering } = require("./clients/infoGathering");
const { exploitationClient } = require("./clients/exploitation");

const { WebSocketServer } = require("ws");

const PORT = process.env.PORT || 8855;
const wss = new WebSocketServer({ port: PORT });

// Spinning the http server and the websocket server.

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on >>> ${PORT}`));

const wsServer = new webSocketServer({ httpServer: server });

// I'm maintaining all active connections in this object
let clients = {};
// I'm maintaining all active users in this object
const users = {};

// const sessions = []

// User activity history.
// let userActivity = [];

wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  var userID = getUniqueID();
  console.log(
    `${new Date()} Recieved a new connection from origin ${request.origin}.`
  );
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(`connected: ${userID} in ${Object.getOwnPropertyNames(clients)}`);
  connection.on("message", function (message) {
    // console.log("userID >>> ", userID)
    // console.log("mssage >>> ", message)

    if (message.type === "utf8") {
      const dataFromClient = JSON.parse(message.utf8Data);
      console.log("message>>>", dataFromClient.eventType);
      // console.log("dataFromClient>>>", dataFromClient)

      // const json = { type: dataFromClient.type };
      // if (dataFromClient.eventType === typesDef.TEST) {
      //   sendMessage(JSON.stringify({ eventType: typesDef.TEST, data: "test_event data" }))
      //   // sendMessageExceptOneById(clients, JSON.stringify({ data: "test_event data", eventType: typesDef.TEST }), userID)
      // }

      if (dataFromClient.eventType === typesDef.USER_EVENT) {
        users[userID] = dataFromClient;
        console.log(`${dataFromClient.username} joined the server`);
        // userActivity.push(`${dataFromClient.username} joined the server`);
        console.log("------------------NEW USER CONNECTED------------------");
        // json.data = { users, userActivity };
        let data = {
          data: { id: userID, name: dataFromClient.username },
          eventType: typesDef.CONNECTION_SUCCESFUL,
        };
        // console.log("JSON.stringify(data) >>> ",typeof JSON.stringify(data))
        sendMessage(clients, JSON.stringify(data));
      }
      // if event is from infogathring module
      else if (
        Object.keys(typesDef).find(
          (key) => typesDef[key] === dataFromClient.eventType
        )
      ) {
        infoGathering(dataFromClient, clients);
      } else if (
        Object.keys(exploitationEvents).find(
          (key) => exploitationEvents[key] === dataFromClient.eventType
        )
      ) {
        exploitationClient(dataFromClient, clients);
      }
      // else if (dataFromClient.eventType === exploitationEvents.GET_FILE_DATA) {
      //   sendMessage(clients, JSON.stringify({ eventType: exploitationEvents.GET_FILE_DATA, data: data }))
      // }
      // else if (dataFromClient.eventType === exploitationEvents.SESSION_FOUND) {
      //   sessions.push(dataFromClient.data)
      //   sendMessage(clients, JSON.stringify({ eventType: exploitationEvents.SESSION_FOUND, data: dataFromClient.data }))
      // }
      // else if (dataFromClient.eventType === exploitationEvents.OPEN_SHELL) {
      //   sendMessage(clients, JSON.stringify({ eventType: exploitationEvents.OPEN_SHELL, data: sessions[0] }))
      // }
      // else if (dataFromClient.eventType === exploitationEvents.SHELL_COMMAND) {
      //   sendMessage(clients, JSON.stringify({ eventType: exploitationEvents.SHELL_COMMAND, data: dataFromClient.data }))
      // }
      // else if (dataFromClient.eventType === exploitationEvents.SHELL_COOMAND_OUTPUT) {
      //   sendMessage(clients, JSON.stringify({ eventType: exploitationEvents.SHELL_COOMAND_OUTPUT, data: dataFromClient.data }))
      // }
      // else if (dataFromClient.eventType === exploitationEvents.CLOSE_SHELL) {
      //   sendMessage(clients, JSON.stringify({ eventType: exploitationEvents.CLOSE_SHELL, data: {} }))
      // }

      // else if (dataFromClient.eventType === typesDef.HOST_FOUND) {
      //   // sendMessage(JSON.stringify({ data: "test_event data" }))
      //   console.log(dataFromClient)
      //   sendMessageExceptOneById(clients, JSON.stringify({ data: dataFromClient, eventType: typesDef.HOST_FOUND }), userID)
      // }
      // else if (dataFromClient.eventType === typesDef.START_SCANNING) {
      //   sendMessageExceptOneById(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.START_SCANNING }), userID)
      // }
      // else if (dataFromClient.eventType === typesDef.APR_PING_STARTED) {
      //   sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.APR_PING_STARTED }))
      // }
      // else if (dataFromClient.eventType === typesDef.APR_PING_FINISHED) {
      //   sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.APR_PING_FINISHED }))
      // }
      // else if (dataFromClient.eventType === typesDef.APR_PING_FINISHED) {
      //   sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.APR_PING_FINISHED }))
      // }
      // else if (dataFromClient.eventType === typesDef.REQ_IP_DATA) {
      //   sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.REQ_IP_DATA }))
      // }
      // else if (dataFromClient.eventType === typesDef.REQUESTED_IP_DATA_SENT) {
      //   sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.REQUESTED_IP_DATA_SENT }))
      // }
    }
  });

  // user disconnected
  connection.on("close", function (connection) {
    console.log(new Date() + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    json.data = { users };
    delete clients[userID];
    delete users[userID];
    sendMessage(clients, JSON.stringify(json));
  });
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
