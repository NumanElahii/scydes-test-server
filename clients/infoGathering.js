const { typesDef } = require('../types')
const { sendMessage } = require('../utils/methods')

const infoGathering = (dataFromClient, clients) => {

    console.log("dataFromClient >> infoGathring >>> ",dataFromClient)

    switch (dataFromClient.eventType) {
        case typesDef.HOST_FOUND:
            console.log(dataFromClient)
            // sendMessageExceptOneById(clients, JSON.stringify({ data: dataFromClient, eventType: typesDef.HOST_FOUND }), userID)
            sendMessage(clients, JSON.stringify({ data: dataFromClient, eventType: typesDef.HOST_FOUND }))
            break;

        case typesDef.START_SCANNING:
            sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.START_SCANNING }))
            break;

        case typesDef.APR_PING_STARTED:
            sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.APR_PING_STARTED }))
            break;

        case typesDef.APR_PING_FINISHED:
            sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.APR_PING_FINISHED }))
            break;

        case typesDef.REQ_IP_DATA:
            sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.REQ_IP_DATA }))
            break;

        case typesDef.REQUESTED_IP_DATA_SENT:
            sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: typesDef.REQUESTED_IP_DATA_SENT }))
            break;
        default:
            sendMessage(clients, JSON.stringify({ data: dataFromClient.data, eventType: eventType }))
            break;
    }
}


module.exports = {
    infoGathering
}