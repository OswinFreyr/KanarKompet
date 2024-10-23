const express = require("express");

const { db } = require("./models/db");

const Init = require("./data/integration")

const festivalRouter = require("./routes/festivalRoutes");
const regionRouter = require("./routes/regionRoute");
const communeRouter = require("./routes/communeRoute");
const disciplineRouter = require("./routes/disciplineRoute");
const envergureRouter = require("./routes/envergureRoute");
const localisationRouter = require("./routes/localisationRoute");
const moisRouter = require("./routes/moisRoute");

const app = express();
const PORT = 2000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.json({limit: "2mb"}));

app.use("/api/v1/festivals", festivalRouter);
app.use("/api/v1/regions", regionRouter);
app.use("/api/v1/communes", communeRouter);
app.use("/api/v1/disciplines", disciplineRouter);
app.use("/api/v1/envergures", envergureRouter);
app.use("/api/v1/localisations", localisationRouter);
app.use("/api/v1/mois", moisRouter);

db.sync(/*{force : true}*/)
    .then(async () => {
        // Init.runInit()
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });