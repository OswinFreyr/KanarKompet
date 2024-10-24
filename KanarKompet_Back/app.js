const express = require("express");
const cors = require("cors");
const { db } = require("./models/db");

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
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.json({limit: "2mb"}));

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/canards", canardRouter);
app.use("/api/v1/commentairesCanard", commentaireCanardRouter);
app.use("/api/v1/commentairesCompetition", commentaireCompetitionRouter);
app.use("/api/v1/competitions", competitionRouter);
app.use("/api/v1/races", raceRouter);
app.use("/api/v1/utilisateurs", utilisateurRouter);

db.sync(/*{force : true}*/)
    .then(async () => {
            app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });