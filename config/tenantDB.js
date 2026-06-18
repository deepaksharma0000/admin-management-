const mongose = require("mongoose");
const connections = {};

async function getTenantDB(dbName) {
    if (connections[dbName]) {
        return connections[dbName];
    }

    const conn = await mongose.createConnection(`${process.env.MONGO_URI}/${dbName}`,);
    connections[dbName] = conn;
    return conn;
}

module.exports = getTenantDB;