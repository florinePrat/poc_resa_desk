require('dotenv').config();
const bookingController = require('../../../controllers/bookingController');


module.exports = async (req, res) => {
    try {
        /* Check inputs */
        const { idUser, idDesk, date } = req.body;
        if (!idUser || !idDesk) {
            return res.status(400).json({ error: "Input(s) non valide(s)" });
        }

        /* Check booking */
        if (await bookingController.getBookingByDeskByDate(idDesk, date)) {
            return res.status(400).json({ error: "Ce bureau est déjà réservé à cette date" });
        } else if(await bookingController.getBookingByUserByDate(idUser, date)) {
            return res.status(400).json({ error: "Tu as déjà réservé à cette date" });
        }
        else {

            const booking = await bookingController.createBooking(idUser,idDesk,date);

            return res.status(200).json({
                success: true,
                booking
            });
        
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Impossible de créer le bureau"
        });
    }
};