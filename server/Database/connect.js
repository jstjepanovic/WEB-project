const mongodb = require("mongodb");

const ConnectDatabase = async (name) =>{
    const url = "mongodb://127.0.0.1:27017";
    const client = new mongodb.MongoClient(url);

    let db;
    try {
        await client.connect();
        console.log(`MongoDB: Successfully connected`);
        db = client.db(name);
    } catch(e) {
        console.log(e);
    }
    
    return db;
}

module.exports = { ConnectDatabase }