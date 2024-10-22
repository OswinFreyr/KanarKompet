const { Admin } = require("./adminModel");
const { CommentaireCanard } = require("./commentaireCanardModel");
const { Competition } = require("./competitionModel");
const { Canard } = require("./canardModel");
const { Localisation } = require("./localisationModel");
const { Race } = require("./raceModel");
const { Utilisateur } = require("./utilisateurModel");
const { CommentaireCompetition } = require("./commentaireCompetitionModel");


Race.hasMany(Canard);
Canard.belongsTo(Race);

Canard.hasMany(CommentaireCanard, { onDelete: 'CASCADE' });
CommentaireCanard.belongsTo(Canard);

Utilisateur.hasMany(CommentaireCanard, { onDelete: 'CASCADE' });
CommentaireCanard.belongsTo(Utilisateur);

Utilisateur.hasMany(CommentaireCompetition, { onDelete: 'CASCADE' });
CommentaireCompetition.belongsTo(Utilisateur);

Utilisateur.hasMany(Canard, { onDelete: 'CASCADE' });
Canard.belongsTo(Utilisateur);

Competition.hasMany(CommentaireCompetition, { onDelete: 'CASCADE' });
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
