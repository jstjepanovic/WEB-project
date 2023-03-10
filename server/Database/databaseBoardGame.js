const mongodb = require("mongodb");

const CreateBoardGame = async (db, boardGame) =>{
    const collection = db.collection("boardGames");

    return await collection.insertOne(boardGame);
}

const FindAllBoardGame = async (db) =>{
    const collection = db.collection("boardGames");

    return await collection.find().toArray();
}

const FindBoardGame = async (db, boardGameId) =>{
    const collection = db.collection("boardGames");

    let _id = new mongodb.ObjectId(boardGameId);

    return await collection.findOne({ _id });
}

const UpdateBoardGame = async (db, boardGameId, boardGame) =>{
    const collection = db.collection("boardGames");

    let _id = new mongodb.ObjectId(boardGameId);

    let newBoardGame = { $set: { name: boardGame.name, rating: boardGame.rating, weight: boardGame.weight, age: boardGame.age, avgPlayingTime: boardGame.avgPlayingTime,
                                 publisher: boardGame.publisher, noPlayersMin: boardGame.noPlayersMin, noPlayersMax: boardGame.noPlayersMax, genreIds: boardGame.genreIds } }

    return await collection.updateOne({ _id }, newBoardGame);
}

const DeleteBoardGame = async (db, boardGameId) =>{
    const collection = db.collection("boardGames");

    let _id = new mongodb.ObjectId(boardGameId);

    return await collection.deleteOne({ _id });
}

module.exports = { CreateBoardGame, FindBoardGame, FindAllBoardGame, UpdateBoardGame, DeleteBoardGame }