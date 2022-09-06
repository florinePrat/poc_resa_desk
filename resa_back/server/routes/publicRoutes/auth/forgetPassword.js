require('dotenv').config();
const userController = require('../../../controllers/userController');
const newPassword = require('../../../services/mail/newPassword');


module.exports = async (req, res, next) => {
    try {
        const mail = req.body.mail
        if (!mail) {
            return res.status(400).json({ error: "Input(s) non valide(s)" });
        }
        /* Check if database knows this mail */
        if (!await userController.getUserByEmail(mail.toLowerCase())) {
            return res.status(400).json({ error: "Cet mail n'est pas dans notre base de donnée" });
        }
        const password_reset = await newPassword(mail)
        if (password_reset) {
            return res.status(200).json({
                success: true,
                message: 'Mot de passe provisoire envoyé',
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Mot de passe provisoire non envoyé',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Impossible d'envoyer un mot de passe provisoire"
        });
    }
};