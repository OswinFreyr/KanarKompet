const { Commentaire, Region, Commune, Discipline, Envergure, Localisation, Mois, Canard, Utilisateur, Competition, Admin } = require('../models/associations.js');

async function createCommentaire(commentaire) {
    return await Commentaire.create(commentaire);
}

async function getAllCommentaires(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.identifiant) {
        where.identifiant = criterias.identifiant;
    }
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.site_internet) {
        where.site_internet = criterias.site_internet;
    }
    if (criterias.e_mail) {
        where.e_mail = criterias.e_mail;
    }
    if (criterias.sous_categorie) {
        where.sous_categorie = criterias.sous_categorie;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const commentaires = await Commentaire.findAll({
        where,
        include: {
            model: Canard,
            model: Utilisateur,
            model: Competition,
            model: Admin,
        },
        limit,
        offset
    });
    if (commentaires) {
        return commentaires;
    }
    else {
        return null;
    }
}

async function getLimitedCommentaires(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.identifiant) {
        where.identifiant = criterias.identifiant;
    }
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.site_internet) {
        where.site_internet = criterias.site_internet;
    }
    if (criterias.e_mail) {
        where.e_mail = criterias.e_mail;
    }
    if (criterias.sous_categorie) {
        where.sous_categorie = criterias.sous_categorie;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const {count, rows} = await Commentaire.findAndCountAll({
        where,
        include: {
            model: Canard,
            model: Utilisateur,
            model: Competition,
            model: Admin,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        commentaires: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getCommentaireById(id) {
    const commentaire = await Commentaire.findByPk(id, {
        include: {
            model: Canard,
            model: Utilisateur,
            model: Competition,
            model: Admin,
        }
    });
    if (commentaire) {
        return commentaire.toJSON();
    }
    else {
        return null;
    }
}

async function addCanardToCommentaire(idCanard, CommentaireId) {
    const commentaire = await Commentaire.findByPk(CommentaireId);
    const isCanard = await Canard.findByPk(idCanard)
    if (isCanard) {
        // verifier si Commentaire et Canard deja associés
        const isCanardCommentaire = await Commentaire.findAll({ where: { id: CommentaireId }, include: { model: Canard, where: { id: idCanard } } });
        if (isCanardCommentaire.lenght > 0) {
            return null;
        }
        else {
            return commentaire.addCanard(idCanard);
        }
    }
}

async function addUtilisateurToCommentaire(idUtilisateur, CommentaireId) {
    const commentaire = await Commentaire.findByPk(CommentaireId);
    const isUtilisateur = await Utilisateur.findByPk(idUtilisateur)
    if (isUtilisateur) {
        // verifier si Commentaire et Utilisateur deja associés
        const isUtilisateurCommentaire = await Commentaire.findAll({ where: { id: CommentaireId }, include: { model: Utilisateur, where: { id: idUtilisateur } } });
        if (isUtilisateurCommentaire.lenght > 0) {
            return null;
        }
        else {
            return commentaire.addUtilisateur(idUtilisateur);
        }
    }
}

async function addCompetitionToCommentaire(idCompetition, CommentaireId) {
    const commentaire = await Commentaire.findByPk(CommentaireId);
    const isCompetition = await Competition.findByPk(idCompetition)
    if (isCompetition) {
        // verifier si Commentaire et Competition deja associés
        const isCompetitionCommentaire = await Commentaire.findAll({ where: { id: CommentaireId }, include: { model: Competition, where: { id: idCompetition } } });
        if (isCompetitionCommentaire.lenght > 0) {
            return null;
        }
        else {
            return commentaire.addCompetition(idCompetition);
        }
    }
}

async function addAdminToCommentaire(idAdmin, CommentaireId) {
    const commentaire = await Commentaire.findByPk(CommentaireId);
    const isAdmin = await Admin.findByPk(idAdmin)
    if (isAdmin) {
        // verifier si Commentaire et Admin deja associés
        const isAdminCommentaire = await Commentaire.findAll({ where: { id: CommentaireId }, include: { model: Admin, where: { id: idAdmin } } });
        if (isAdminCommentaire.lenght > 0) {
            return null;
        }
        else {
            return commentaire.addAdmin(idAdmin);
        }
    }
}

async function updateCommentaire(id) {

}

async function deleteCommentaire(id) {

}

async function createAllCommentaires(commentaires, regions, communes, disciplines, envergures, localisations, mois) {
    try {

        const tabCommentaires = [];
        commentaires.forEach(async CommentaireData => {
            const CommentaireMoisIds = [];
            CommentaireData.periode_mois?.forEach(el => {
                CommentaireMoisIds.push(mois[el])
            });

            tabCommentaires.push({
                identifiant: CommentaireData.identifiant,
                nom: CommentaireData.nom_du_Commentaire,
                site_internet: CommentaireData.site_internet_du_Commentaire,
                e_mail: CommentaireData.adresse_e_mail,
                sous_categorie: CommentaireData.sous_categorie,
                regionId: regions[CommentaireData.region_principale_de_deroulement],
                communeId: communes[CommentaireData.commune_principale_de_deroulement],
                disciplineId: disciplines[CommentaireData.discipline_dominante],
                envergureId: envergures[CommentaireData.envergure_territoriale],
                localisationId: localisations[CommentaireData.geocodage_xy?.lat + "; " + CommentaireData.geocodage_xy?.lon],
                mois: CommentaireMoisIds
            })
        });

        commentaires = await Commentaire.bulkCreate(tabCommentaires, {ignoreDuplicates: true })

        for (const commentaire of commentaires) {
            let moisList = tabCommentaires.filter(el => el.identifiant === commentaire.identifiant)[0].mois
            await commentaire.addMois(moisList)
        }
        
        console.log('Tous les Commentaires ont été créés avec succès.');

    } catch (err) {
        console.error('Erreur lors de la création des Commentaires :', err);
    }
}

module.exports = { createCommentaire, getAllCommentaires, getLimitedCommentaires, getCommentaireById, addCanardToCommentaire, addUtilisateurToCommentaire, addCompetitionToCommentaire, addAdminToCommentaire, updateCommentaire, deleteCommentaire, createAllCommentaires }