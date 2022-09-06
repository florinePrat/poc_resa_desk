require('dotenv').config();
const deskController = require('../../../controllers/deskController');


module.exports = async (req, res) => {
    try {
        /* Check inputs */
        const { name, location, itemList } = req.body;
        if (!name || !location) {
            return res.status(400).json({ error: "Input(s) non valide(s)" });
        }

        /* Check desk */
        if (await deskController.getDeskByName(name)) {
            return res.status(400).json({ error: "Ce bureau existe déjà" });
        } else {

            const desk = await deskController.createDesk(name, location, itemList);

            return res.status(200).json({
                success: true,
                desk
            });
        
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Impossible de créer le bureau"
        });
    }
};