const express = require("express");
const mongodb = require("mongodb");
const dbConnect = require("./Database/connect");
const dbBoardGame = require("./Database/databaseBoardGame");

const port = 3000;

(async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    let db = await dbConnect.ConnectDatabase("BoardFrenzy");

    app.get("/api/boardGame", async (req, res) => {

        res.send(await dbBoardGame.FindAllBoardGame(db));
    });

    app.get("/api/boardGame/:boardGameId", async (req, res) => {

        res.send(await dbBoardGame.FindBoardGame(db, req.params.boardGameId));
    });

    app.post("/api/boardGame", async (req, res) => {
        let boardGame = req.body;

        res.send({
            status: await dbBoardGame.CreateBoardGame(db, boardGame)
        });
    });

    app.delete("/api/boardGame/:boardGameId", async (req, res) =>{

        res.send({
            status: await dbBoardGame.DeleteBoardGame(db, req.params.boardGameId)
        });
    })

    app.patch("/api/boardGame/:boardGameId", async (req, res) =>{
        let boardGame = req.body;

        res.send({
            status: await dbBoardGame.UpdateBoardGame(db, req.params.boardGameId, boardGame)
        });

    })
    
 
    app.listen(port, () => {
        console.log(`Server is listening at ${port}`);
    }); 

})();