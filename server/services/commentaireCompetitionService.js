const { CommentaireCompetition, Canard, Utilisateur, Competition, Admin } = require('../models/associations.js');

async function createCommentaireCompetition(commentaireCompetition) {
    return await CommentaireCompetition.create(commentaireCompetition);
}

async function getAllCommentairesCompetition(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const commentairesCompetition = await CommentaireCompetition.findAll({
        where,
        include: {
            model: Utilisateur,
            model: Competition,
            model: Admin,
        },
        limit,
        offset
    });
    if (commentairesCompetition) {
        return commentairesCompetition;
    }
    else {
        return null;
    }
}

async function getLimitedCommentairesCompetition(criterias = {}, pageId, itemsPerPage) {
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
    const {count, rows} = await CommentaireCompetition.findAndCountAll({
        where,
        include: {
            model: Utilisateur,
            model: Competition,
            model: Admin,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        commentairesCompetition: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getCommentaireCompetitionById(id) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(id, {
        include: {
            model: Canard,
            model: Utilisateur,
            model: Competition,
            model: Admin,
        }
    });
    if (commentaireCompetition) {
        return commentaireCompetition.toJSON();
    }
    else {
        return null;
    }
}

async function addUtilisateurToCommentaireCompetition(idUtilisateur, CommentaireCompetitionId) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(CommentaireCompetitionId);
    const isUtilisateur = await Utilisateur.findByPk(idUtilisateur)
    if (isUtilisateur) {
        // verifier si CommentaireCompetition et Utilisateur deja associés
        const isUtilisateurCommentaireCompetition = await CommentaireCompetition.findAll({ where: { id: CommentaireCompetitionId }, include: { model: Utilisateur, where: { id: idUtilisateur } } });
        if (isUtilisateurCommentaireCompetition.lenght > 0) {
            return null;
        }
        else {
            return commentaireCompetition.addUtilisateur(idUtilisateur);
        }
    }
}

async function addCompetitionToCommentaireCompetition(idCompetition, CommentaireCompetitionId) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(CommentaireCompetitionId);
    const isCompetition = await Competition.findByPk(idCompetition)
    if (isCompetition) {
        // verifier si CommentaireCompetition et Competition deja associés
        const isCompetitionCommentaireCompetition = await CommentaireCompetition.findAll({ where: { id: CommentaireCompetitionId }, include: { model: Competition, where: { id: idCompetition } } });
        if (isCompetitionCommentaireCompetition.lenght > 0) {
            return null;
        }
        else {
            return commentaireCompetition.addCompetition(idCompetition);
        }
    }
}

async function addAdminToCommentaireCompetition(idAdmin, CommentaireCompetitionId) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(CommentaireCompetitionId);
    const isAdmin = await Admin.findByPk(idAdmin)
    if (isAdmin) {
        // verifier si CommentaireCompetition et Admin deja associés
        const isAdminCommentaireCompetition = await CommentaireCompetition.findAll({ where: { id: CommentaireCompetitionId }, include: { model: Admin, where: { id: idAdmin } } });
        if (isAdminCommentaireCompetition.lenght > 0) {
            return null;
        }
        else {
            return commentaireCompetition.addAdmin(idAdmin);
        }
    }
}

async function deleteCommentaireCompetition(id) {

}

async function createAllCommentairesCompetition(commentaires, regions, communes, disciplines, envergures, localisations, mois) {
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

module.exports = { createCommentaireCompetition, getAllCommentairesCompetition, getLimitedCommentairesCompetition, getCommentaireCompetitionById, addUtilisateurToCommentaireCompetition, addCompetitionToCommentaireCompetition, addAdminToCommentaireCompetition, deleteCommentaireCompetition, createAllCommentairesCompetition }