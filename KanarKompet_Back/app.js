const express = require("express");
const cors = require("cors");
const { db } = require("./models/db");
const jwtMiddleware = require('./middlewares/jwtMiddleware');

const authRouter = require("./routes/authRoute");

const adminRouter = require("./routes/adminRoute");
const canardRouter = require("./routes/canardRoute");
const commentaireCanardRouter = require("./routes/commentaireCanardRoute");
const commentaireCompetitionRouter = require("./routes/commentaireCompetitionRoute");
const competitionRouter = require("./routes/competitionRoute");
const raceRouter = require("./routes/raceRoute");
const utilisateurRouter = require("./routes/utilisateurRoute");

const app = express();
const PORT = 2000;
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
}));

/*app.use(function(req,res,next) {
    console.log(req.headers);
    next();
})*/

app.use(express.json({limit: "2mb"}));

app.use("/api/v1/login", authRouter);

app.use("/api/v1/admins", /*jwtMiddleware.jwtMiddleware,*/ adminRouter);
app.use("/api/v1/canards", /*jwtMiddleware.jwtMiddleware,*/ canardRouter);
app.use("/api/v1/commentairesCanard", /*jwtMiddleware.jwtMiddleware,*/ commentaireCanardRouter);
app.use("/api/v1/commentairesCompetition", /*jwtMiddleware.jwtMiddleware,*/ commentaireCompetitionRouter);
app.use("/api/v1/competitions", /*jwtMiddleware.jwtMiddleware,*/ competitionRouter);
app.use("/api/v1/races", /*jwtMiddleware.jwtMiddleware,*/ raceRouter);
app.use("/api/v1/utilisateurs", /*jwtMiddleware.jwtMiddleware,*/ utilisateurRouter);

db.sync(/*{force : true}*/)
    .then(async () => {
            app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });
