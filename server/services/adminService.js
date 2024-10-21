const { Admin, Commentaire, Competition, } = require('../models/associations.js');

async function createAdmin(admin) {
    return await Admin.create(admin);
}

async function getAllAdmins(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.prenom) {
        where.prenom = criterias.prenom;
    }
    if (criterias.e_mail) {
        where.e_mail = criterias.e_mail;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const admins = await Admin.findAll({
        where,
        include: {
            model: Commentaire,
            model: Competition,
        },
        limit,
        offset
    });
    if (admins) {
        return admins;
    }
    else {
        return null;
    }
}

async function getLimitedAdmins(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.prenom) {
        where.prenom = criterias.prenom;
    }
    if (criterias.e_mail) {
        where.e_mail = criterias.e_mail;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const {count, rows} = await Competition.findAndCountAll({
        where,
        include: {
            model: Commentaire,
            model: Competition,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        utilisateurs: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getAdminById(id) {
    const admin = await Admin.findByPk(id, {
        include: {
            model: Commentaire,
            model: Competition,
        }
    });
    if (admin) {
        return admin.toJSON();
    }
    else {
        return null;
    }
}

async function addCommentaireToAdmin(idCommentaire, adminId) {
    const admin = await Admin.findByPk(adminId);
    const isCommentaire = await Commentaire.findByPk(idCommentaire)
    if (isCommentaire) {
        // verifier si Admin et Commentaire deja associés
        const isCommentaireAdmin = await Admin.findAll({ where: { id: adminId }, include: { model: Commentaire, where: { id: idCommentaire } } });
        if (isCommentaireAdmin.lenght > 0) {
            return null;
        }
        else {
            return admin.addCommentaire(idCommentaire);
        }
    }
}

async function addCompetitionToAdmin(idCompetition, adminId) {
    const admin = await Admin.findByPk(adminId);
    const isCompetition = await Competition.findByPk(idCompetition)
    if (isCompetition) {
        // verifier si Admin et Competition deja associés
        const isCompetitionAdmin = await Admin.findAll({ where: { id: adminId }, include: { model: Competition, where: { id: idCompetition } } });
        if (isCompetitionAdmin.lenght > 0) {
            return null;
        }
        else {
            return admin.addCompetition(idCompetition);
        }
    }
}

async function updateAdmin(id) {

}

async function deleteAdmin(id) {

}


module.exports = { createAdmin, getAllAdmins, getLimitedAdmins, getAdminById, addCommentaireToAdmin, addCompetitionToAdmin, updateAdmin, deleteAdmin }