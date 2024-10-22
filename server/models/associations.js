const { Admin } = require("./adminModel");
const { Commentaire } = require("./commentaireCanardModel");
const { Competition } = require("./competitionModel");
const { Canard } = require("./canardModel");
const { Localisation } = require("./localisationModel");
const { Race } = require("./raceModel");
const { Utilisateur } = require("./utilisateurModel");


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

Admin.hasMany(Commentaire);
Commentaire.belongsTo(Admin);

Admin.hasMany(Competition);
Competition.belongsTo(Admin);

Localisation.hasMany(Competition);
Competition.belongsTo(Localisation);

Canard.belongsToMany(Competition, { through: "canardCompetition" });
Competition.belongsToMany(Canard, { through: "canardCompetition" });

Utilisateur.belongsToMany(Competition, { through: "utilisateurCompetition" });
Competition.belongsToMany(Utilisateur, { through: "utilisateurCompetition" });


module.exports = { Admin, Commentaire, Competition, Canard, Localisation, Race, Utilisateur };
