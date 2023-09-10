const mongodb = require("mongodb");

const CreateUser = async (db, user) =>{
    const collection = db.collection("user");

    return await collection.insertOne(user);
}

const FindUsername = async (db, username) =>{
    const collection = db.collection("user");

    return await collection.findOne({ username });
}

module.exports = { CreateUser, FindUsername }