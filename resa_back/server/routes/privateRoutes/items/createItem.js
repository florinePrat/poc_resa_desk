require('dotenv').config();
const itemController = require('../../../controllers/itemController');


module.exports = async (req, res) => {
    try {
        /* Check inputs */
        const { name, serialNumber } = req.body;
        if (!name || !serialNumber) {
            return res.status(400).json({ error: "Input(s) non valide(s)" });
        }

        const item = await itemController.createItem(name, serialNumber);

        return res.status(200).json({
            success: true,
            item
        });

    }
    catch (error) {
        return res.status(500).json({
            error: "Impossible de créer l'item"
        });
    }
};