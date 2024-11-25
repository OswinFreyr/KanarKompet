const { Admin, Competition, CommentaireCompetition, } = require('../models/associations.js');

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
        include:[ 
            {model: CommentaireCompetition},
            {model: Competition},
        ],
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
    const {count, rows} = await Admin.findAndCountAll({
        where,
        include: [
            {model: CommentaireCompetition},
            {model: Competition},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        admins: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getAdminById(id) {
    const admin = await Admin.findByPk(id, {
        include: [
            {model: CommentaireCompetition},
            {model: Competition}]
        
    });
    if (admin) {
        return admin.toJSON();
    }
    else {
        return null;
    }
}

async function addCommentaireCompetitionToAdmin(idCommentaireCompetition, adminId) {
    const admin = await Admin.findByPk(adminId);
    const isCommentaireCompetition = await CommentaireCompetition.findByPk(idCommentaireCompetition)
    if (isCommentaireCompetition) {
        // verifier si Admin et CommentaireCompetition deja associés
        const isCommentaireCompetitionAdmin = await Admin.findAll({ where: { id: adminId }, include: { model: CommentaireCompetition, where: { id: idCommentaireCompetition } } });
        if (isCommentaireCompetitionAdmin.lenght > 0) {
            return null;
        }
        else {
            return admin.addCommentaireCompetition(idCommentaireCompetition);
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

async function updateAdmin(adminId, updatedData) {
    const admin = await Admin.findByPk(adminId);
    if (admin) {
        if (updatedData.competitionIds && Array.isArray(updatedData.competitionIds)) {
            const competitions = await Competition.findAll({
                where: { id: updatedData.competitionIds }
            });
            await admin.setCompetitions(competitions);
        }
        if (updatedData.commentaireCompetitionIds && Array.isArray(updatedData.commentaireCompetitionIds)) {
            const commentairesCompetition = await CommentaireCompetition.findAll({
                where: { id: updatedData.commentaireCompetitionIds }
            });
            await admin.setCommentaireCompetitions(commentairesCompetition);
        }
        return admin.update(updatedData);
    }
    else {
        return null;
    }
}


module.exports = { createAdmin, getAllAdmins, getLimitedAdmins, getAdminById, addCommentaireCompetitionToAdmin, addCompetitionToAdmin, updateAdmin, }