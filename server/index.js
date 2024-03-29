const express = require("express");
const path = require("path");
const cors = require('cors');

const dbConnect = require("./Database/connect");
const dbBoardGame = require("./Database/databaseBoardGame");
require('dotenv').config();
const dbReview = require("./Database/databaseReview");
const dbGenres = require("./Database/databaseGenre");
const dbUser = require("./Database/databaseUser")

const crypto = require("crypto");
const util = require("util");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const csurf = require("csurf");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const randomBytesAsync = util.promisify(crypto.randomBytes);
const pbkdf2Async = util.promisify(crypto.pbkdf2);

const csrfProtection = csurf({ cookie: true });

const secret = process.env.SECRET;
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

(async () => {
    const app = express();
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/images', express.static(path.join(__dirname, 'images')));
    app.use(cookieParser());

    app.get('/csrfEndpoint', csrfProtection, (req, res, next) => {
        res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
    })
    
 
    let db = await dbConnect.ConnectDatabase("BoardFrenzy", mongoUrl);

    //dbGenres.CreateGenres(db, dbGenres.genres)

    app.get("/api/genres", async (req, res) => {

        res.send(await dbGenres.FindAllGenre(db));
    });

    app.get("/api/genresById", async (req, res) => {
        let genres = req.body.genreIds
 
        res.send(await dbGenres.FindGenreById(db, genres));
    });
 
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
    });

    app.patch("/api/boardGame/:boardGameId", async (req, res) =>{
        let boardGame = req.body;

        res.send({
            status: await dbBoardGame.UpdateBoardGame(db, req.params.boardGameId, boardGame)
        });

    });

    app.get("/api/review", async (req, res) => {

        res.send(await dbReview.FindAllReviews(db));
    });

    app.get("/api/review/:boardGameId", async (req, res) => {

        res.send(await dbReview.FindReviews(db, req.params.boardGameId));
    });

    app.get("/api/userreview/:userId", async (req, res) => {

        res.send(await dbReview.FindUserReviews(db, req.params.userId));
    });

    app.post("/api/review", (req, res, next) =>{

        try{
            const token = req.headers.authorization;
            jwt.verify(token, secret)
            next();
        } catch (error){
            res.status(401).json({ message: 'Error with authentication token' });
        }
        

    }, async (req, res) => {        
        let review = req.body;

        res.send({
            status: await dbReview.CreateReview(db, review)
        });
    });

    app.delete("/api/review/:reviewId", async (req, res) =>{

        res.send({
            status: await dbReview.DeleteReview(db, req.params.reviewId)
        });
    });

    app.patch("/api/review/:reviewId", async (req, res) =>{
        let review = req.body;

        res.send({
            status: await dbReview.UpdateReview(db, req.params.reviewId, review)
        });

    });

    app.get("/api/user/:userId", async (req, res) => {

        res.send(await dbUser.FindUser(db, req.params.userId));
    });

    app.post('/api/upload-avatar/:userId', upload.single('avatar'), async (req, res) => {
        if (!req.file) {
          return res.status(400).json({ message: 'No file provided' });
        }
      
        const filePath = req.file.path;
        const baseUrl = 'https://board-frenzy.onrender.com';
      
        res.send(await dbUser.UpdateAvatar(db, req.params.userId, baseUrl + '/images/' + path.basename(filePath)));
      });

 
    app.post('/api/register', async (req, res) => {
        try {
            const user = req.body;
            
            const existingUser = await dbUser.FindUsername(db, user.username)


            if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
            }

            const salt = (await randomBytesAsync(16)).toString("hex");
            const hash = (await pbkdf2Async(user.password, salt, 1000, 64, "sha512")).toString("hex");
            
            toSave = {username : user.username, hash, salt}
            
            res.send({
                status: await dbUser.CreateUser(db, toSave),
                message: 'User registered'
            }); 

          
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Registration failed' });
        }
    }); 
     
    app.post('/api/login', async (req, res) => {
        try {
            const user = req.body;
            
            const existingUser = await dbUser.FindUsername(db, user.username)
          
            if (!existingUser) {
                return res.status(401).json({ message: 'Incorrect username or password' });
            }

            const hash = (await pbkdf2Async(user.password, existingUser.salt, 1000, 64, "sha512")).toString("hex");

            if(hash == existingUser.hash){
                const token = jwt.sign({ username: user.username, _id: existingUser._id}, secret, {'expiresIn':"1h"})
                res.status(200).json({
                    token,
                    expiresIn: 3600
                });
            }else{
                res.status(401).json({ message: 'Incorrect username or password' });
            }
            
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Authentication failed' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is listening at ${port}`);
    });

})();