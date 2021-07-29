const sendMessage = (clients,json) => {
    // We are sending the current data to all connected clients
    Object.keys(clients).map((client) => {
        clients[client] && clients[client].sendUTF(json);
    });
};

// We are sending the current data to a specific(given id) client
const sendMessageById = (clients,json, id) => {
    clients[id].sendUTF(json);
};

// We are sending the current data to all the connected clints except the specific(given id) client
const sendMessageExceptOneById = (clients,json, id) => {
    // console.log("id >>>> ", id)
    for (let client in clients) {
        // console.log("client >> ", client)
        if (client !== id)
            clients[client].sendUTF(json);
    }
}

// Generates unique ID for every new connection
const getUniqueID = () => {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return s4() + s4() + "-" + s4();
};

const printArray = (arr) => {
    for(let i = 0; i < arr.length; i++)
        console.log(arr[i]);
}

module.exports = {
    getUniqueID,
    sendMessageById,
    sendMessage,
    sendMessageExceptOneById,
    printArray
}