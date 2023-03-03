const mongodb = require("mongodb");

const UpdateBG = async (db, boardGameId) =>{
    const rcollection = db.collection("reviews");
    const bgcollection = db.collection("boardGames");

    let newWeight = 0, newRating = 0;

    let reviews = await rcollection.find({ boardGameId }).toArray();
    for (let review of reviews){
        newWeight += review.weight;
        newRating += review.rating;
    }
    newRating /= reviews.length;
    newWeight /= reviews.length;

    let _id = new mongodb.ObjectId(boardGameId);

    let newBoardGame = { $set: { rating: newRating, weight: newWeight } };
    await bgcollection.updateOne({ _id }, newBoardGame);
}

const CreateReview = async (db, review) =>{
    const rcollection = db.collection("reviews");

    let toReturn = await rcollection.insertOne(review);
    
    await UpdateBG(db, review.boardGameId);

    return toReturn;
}

const FindAllReviews = async (db) =>{
    const collection = db.collection("reviews");

    return await collection.find().toArray();
}

const FindReviews = async (db, boardGameId) =>{
    const collection = db.collection("reviews");

    return await collection.find({ boardGameId }).toArray();
}

const UpdateReview = async (db, reviewId, review) =>{
    const collection = db.collection("reviews");

    let _id = new mongodb.ObjectId(reviewId);
    let newReview = { $set: { rating: review.rating, weight: review.weight, text: review.text } }
    let toReturn = await collection.updateOne({ _id }, newReview);

    let nreview = await collection.find({ _id }).toArray();
    await UpdateBG(db, nreview[0].boardGameId); 

    return toReturn;
}

const DeleteReview = async (db, reviewId) =>{
    const collection = db.collection("reviews");

    let _id = new mongodb.ObjectId(reviewId);
    let review = await collection.find({ _id }).toArray();

    let toReturn = await collection.deleteOne({ _id });

    await UpdateBG(db, review[0].boardGameId);

    return toReturn;
}

module.exports = { CreateReview, FindAllReviews, FindReviews, UpdateReview, DeleteReview }