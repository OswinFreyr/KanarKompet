const { Admin } = require("./adminModel");
const { Commentaire } = require("./commentaireModel");
const { Competition } = require("./competitionModel");
const { Canard } = require("./canardModel");
const { Localisation } = require("./localisationModel");
const { Race } = require("./raceModel");
const { Utilisateur } = require("./utilisateurModel");


Race.hasMany(Duck);
Canard.belongsTo(Race);

Canard.hasMany(Commentaire);
Commentaire.belongsTo(Canard);

Utilisateur.hasMany(Commentaire);
Commentaire.belongsTo(Utilisateur);

Competition.hasMany(Commentaire);
Commentaire.belongsTo(Competition);

Admin.hasMany(Commentaire);
Commentaire.belongsTo(Admin);

Admin.hasMany(Competition);
Competition.belongsTo(Admin);

Localisation.hasMany(Competition);
Competition.belongsTo(Localisation);

Canard.belongsToMany(Competition, { through: "canardCompetition" });
Competition.belongsToMany(Canard, { through: "canardCompetition" });

Canard.belongsToMany(Utilisateur, { through: "canardUtilisateur" });
Utilisateur.belongsToMany(Canard, { through: "canardUtilisateur" });

Utilisateur.belongsToMany(Competition, { through: "utilisateurCompetition" });
Competition.belongsToMany(Utilisateur, { through: "utilisateurCompetition" });


module.exports = { Admin, Commentaire, Competition, Canard, Localisation, Race, Utilisateur };
