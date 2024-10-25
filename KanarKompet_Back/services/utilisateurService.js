const { Utilisateur, Canard, CommentaireCanard, CommentaireCompetition } = require('../models/associations.js');
const bcrypt = require('bcrypt');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

async function createUtilisateur(utilisateur) {
    const saltRounds = 5; 
    
    const hashPassword = async (plainPassword) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);
            // console.log('Mot de passe haché :', hashedPassword);
            return hashedPassword;
        } catch (error) {
            console.error('Erreur lors du hachage du mot de passe :', error);
            throw error;
        }
    };
    
    utilisateur.mot_de_passe = await hashPassword(utilisateur.mot_de_passe);

    return await Utilisateur.create(utilisateur);
}

async function getAllUtilisateurs(criterias = {}) {
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
    const utilisateurs = await Utilisateur.findAll({
        where,
        include: [
            {model: CommentaireCanard},
            {model: CommentaireCompetition},
            {model: Canard},
        ],
        limit,
        offset
    });
    if (utilisateurs) {
        return utilisateurs;
    }
    else {
        return null;
    }
}

async function getLimitedUtilisateurs(criterias = {}, pageId, itemsPerPage) {
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
        include: [
            {model: CommentaireCanard},
            {model: CommentaireCompetition},
            {model: Canard},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        utilisateurs: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getUtilisateurById(id) {
    const utilisateur = await Utilisateur.findByPk(id, {
        include: [
            {model: CommentaireCanard},
            {model: CommentaireCompetition},
            {model: Canard},
        ]
    });
    if (utilisateur) {
        return utilisateur.toJSON();
    }
    else {
        return null;
    }
}

async function addCanardToUtilisateur(idCanard, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCanard = await Canard.findByPk(idCanard)
    if (isCanard) {
        // verifier si Utilisateur et Canard deja associés
        const isCanardUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: Canard, where: { id: idCanard } } });
        if (isCanardUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCanard(idCanard);
        }
    }
}

async function addCommentaireCanardToUtilisateur(idCommentaireCanard, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCommentaireCanard = await CommentaireCanard.findByPk(idCommentaireCanard)
    if (isCommentaireCanard) {
        // verifier si Utilisateur et CommentaireCanard deja associés
        const isCommentaireCanardUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: CommentaireCanard, where: { id: idCommentaireCanard } } });
        if (isCommentaireCanardUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCommentaireCanard(idCommentaireCanard);
        }
    }
}

async function addCommentaireCompetitionToUtilisateur(idCommentaireCompetition, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCommentaireCompetition = await CommentaireCompetition.findByPk(idCommentaireCompetition)
    if (isCommentaireCompetition) {
        // verifier si Utilisateur et CommentaireCompetition deja associés
        const isCommentaireCompetitionUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: CommentaireCompetition, where: { id: idCommentaireCompetition } } });
        if (isCommentaireCompetitionUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCommentaireCompetition(idCommentaireCompetition);
        }
    }
}

async function updateUtilisateur(utilisateurId, updatedData) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    if (utilisateur) {
        if (updatedData.canardIds && Array.isArray(updatedData.canardIds)) {
            const canards = await Canard.findAll({
                where: { id: updatedData.canardIds }
            });
            await utilisateur.setCanards(canards);
        }

        if (updatedData.commentaireCanardIds && Array.isArray(updatedData.commentaireCanardIds)) {
            const commentaireCanards = await CommentaireCanard.findAll({
                where: { id: updatedData.commentaireCanardIds }
            });
            await utilisateur.setCommentaireCanards(commentaireCanards);
        }

        if (updatedData.commentaireCompetitionIds && Array.isArray(updatedData.commentaireCompetitionIds)) {
            const commentaireCompetitions = await CommentaireCompetition.findAll({
                where: { id: updatedData.commentaireCompetitionIds }
            });
            await utilisateur.setCommentaireCompetitions(commentaireCompetitions);
        }
        return utilisateur.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteUtilisateur(utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    if (utilisateur) {
        return utilisateur.destroy();
    }
    else {
        return null;
    }
}

async function loginUtilisateur(utilisateurData) {
    const utilisateur = await Utilisateur.scope("withPassword").findOne({ where: { e_mail: utilisateurData.e_mail}});
    
    const verifyPassword = async (plainPassword, hashedPassword) => {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        if (match) {
            return true;
        } else {
            return false;
        }
    }; 
    
    const verif = await verifyPassword(utilisateurData.mot_de_passe, utilisateur.mot_de_passe)

    if (verif) {
        const token = jwtMiddleware.generateToken(utilisateur);
        return {token: token}
    }
    else {
        return null
    }
}


module.exports = { createUtilisateur, getAllUtilisateurs, getLimitedUtilisateurs, getUtilisateurById, addCanardToUtilisateur, addCommentaireCanardToUtilisateur, addCommentaireCompetitionToUtilisateur, updateUtilisateur, deleteUtilisateur, loginUtilisateur, }