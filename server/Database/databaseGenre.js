const mongodb = require("mongodb");

genres = [
    { name : "Adventure"},
    { name : "Ancient"},
    { name : "Animals"},
    { name : "Card Game"},
    { name : "City Building"},
    { name : "Civilization"},
    { name : "Dice"},
    { name : "Economic"},
    { name : "Educational"},
    { name : "Environmental"},
    { name : "Exploration"},
    { name : "Fantasy"},
    { name : "Farming"},
    { name : "Fighting"},
    { name : "Horror"},
    { name : "Mafia"},
    { name : "Maze"},
    { name : "Medical"},
    { name : "Medieval"},
    { name : "Music"},
    { name : "Mythology"},
    { name : "Party Game"},
    { name : "Pirates"},
    { name : "Puzzle"},
    { name : "Racing"},
    { name : "Science Fiction"},
    { name : "Sports"},
    { name : "Travel"},
    { name : "Trivia"},
    { name : "Wargame"},
    { name : "Zombies"}
]

const CreateGenres = async (db, genres) =>{
    const collection = db.collection("genres");

    for (let genre of genres)
        await collection.insertOne(genre);

    return
}

const FindAllGenre = async (db) =>{
    const collection = db.collection("genres");

    return await collection.find().toArray();
}

const FindGenreById = async (db, genreIds) =>{
    const collection = db.collection("genres");

    let genres = []

    for (let genreId of genreIds){
        let _id = new mongodb.ObjectId(genreId);
        genres.push(await collection.findOne({ _id }));
    }   
    

    return genres;
}

module.exports = { genres, CreateGenres, FindAllGenre, FindGenreById }