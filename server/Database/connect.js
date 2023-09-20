const mongodb = require("mongodb");

const ConnectDatabase = async (name, url) =>{
    const client = new mongodb.MongoClient(url, {
        useNewUrlParser: true, useUnifiedTopology: true,
        serverApi: {
          version: mongodb.ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
    });

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