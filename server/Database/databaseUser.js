const mongodb = require("mongodb");

const CreateUser = async (db, user) =>{
    const collection = db.collection("user");

    return await collection.insertOne(user);
}

const FindUsername = async (db, username) =>{
    const collection = db.collection("user");

    return await collection.findOne({ username });
}

const FindUser = async (db, userId) =>{
    const collection = db.collection("user");

    let _id = new mongodb.ObjectId(userId);

    return await collection.findOne({ _id }, {'_id': 0, 'username': 1, 'imagePath': 1});
}
 
const UpdateAvatar = async (db, userId, imagePath) =>{
    const collection = db.collection("user");

    let _id = new mongodb.ObjectId(userId);

    return await collection.updateOne({ _id }, {$set: { imagePath }});
}

module.exports = { CreateUser, FindUsername, FindUser, UpdateAvatar }