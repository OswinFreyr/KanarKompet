const { Admin } = require("./adminModel");
const { Commentaire, CommentaireCanard } = require("./commentaireCanardModel");
const { Competition } = require("./competitionModel");
const { Canard } = require("./canardModel");
const { Localisation } = require("./localisationModel");
const { Race } = require("./raceModel");
const { Utilisateur } = require("./utilisateurModel");
const { CommentaireCompetition } = require("./commentaireCompetitionModel");


Race.hasMany(Duck);
Canard.belongsTo(Race);

Canard.hasMany(CommentaireCanard);
CommentaireCanard.belongsTo(Canard);

Utilisateur.hasMany(CommentaireCanard);
CommentaireCanard.belongsTo(Utilisateur);

Utilisateur.hasMany(CommentaireCompetition);
CommentaireCompetition.belongsTo(Utilisateur);

Utilisateur.hasMany(Canard);
Canard.belongsTo(Utilisateur);

Competition.hasMany(CommentaireCompetition);
CommentaireCompetition.belongsTo(Competition);

Admin.hasMany(CommentaireCompetition);
CommentaireCompetition.belongsTo(Admin);

Admin.hasMany(Competition);
Competition.belongsTo(Admin);

Localisation.hasMany(Competition);
Competition.belongsTo(Localisation);

Canard.belongsToMany(Competition, { through: "canardCompetition" });
Competition.belongsToMany(Canard, { through: "canardCompetition" });


module.exports = { Admin, CommentaireCanard, CommentaireCompetition, Competition, Canard, Localisation, Race, Utilisateur };
