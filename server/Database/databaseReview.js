const mongodb = require("mongodb");

const UpdateBG = async (db, boardGameId) =>{
    const rcollection = db.collection("reviews");
    const bgcollection = db.collection("boardGames");

    let newWeight = 0, newRating = 0;

    let reviews = await rcollection.find({ boardGameId }).toArray();
    for (let review of reviews){
        newWeight += Number(review.weight);
        newRating += Number(review.rating);
    }
    newRating /= reviews.length;
    newWeight /= reviews.length;

    let _id = new mongodb.ObjectId(boardGameId);

    let newBoardGame = { $set: { rating: newRating, weight: newWeight } };
    await bgcollection.updateOne({ _id }, newBoardGame);
}

const CreateReview = async (db, review) =>{
    const rcollection = db.collection("reviews");

    review.userId = new mongodb.ObjectId(review.userId);

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

    const pipeline = [
        {
            $match: {
              boardGameId: boardGameId,
            },
          },
          {
            $lookup: {
              from: 'user',
              localField: 'userId',
              foreignField: '_id',
              as: 'creator',
            },
          },
          {
            $project: {
                'rating': 1,
                'weight': 1,
                'text': 1,
                'userId': 1,
                'boardGameId': 1,
                'rating': 1,
                'creator.username': 1
            },
          },
    ];

    result = await collection.aggregate(pipeline).toArray();
    return result
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