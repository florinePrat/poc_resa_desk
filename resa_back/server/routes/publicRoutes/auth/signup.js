require('dotenv').config();
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const userController = require('../../../controllers/userController');


module.exports = async (req, res, next) => {
    try {
        /* Check inputs */
        const { mail, password, name } = req.body;
        if (!mail || !mail.toLowerCase().match(regEmail) || !name || !password) {
            return res.status(400).json({ error: "Input(s) non valide(s)" });
        }
        console.log ('here1')
        /* Check if database knows this mail */
        if (await userController.getUserByEmail(mail.toLowerCase())) {
            console.log ('here3')
            return res.status(400).json({ error: "Cet email est déjà utilisé" });
        } else {
            /* Create users */
            console.log ('here3')
            const user = await userController.createUser(mail.toLowerCase(), name, password);

            /* User created */
            const tokenUser = {
                id: user._id,
                mail: user.mail,
                name: user.name
            };
            const token = jwt.sign(tokenUser, process.env.tokenkey, { expiresIn: '200000h' });

            return res.status(200).json({
                success: true,
                token: token
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Impossible de créer l'utilisateur :" + error
        });
    }
};