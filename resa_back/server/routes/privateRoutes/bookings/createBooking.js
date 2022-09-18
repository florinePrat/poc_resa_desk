require('dotenv').config();
const bookingController = require('../../../controllers/bookingController');


module.exports = async (req, res) => {
    try {
        /* Check inputs */
        const idDesk = req.body.idDesk;
        const date = req.body.date;
        const idUser = req.token.id;
        console.log(idUser, idDesk, date);

        if (!idUser || !idDesk) {
            return res.status(400).json({ error: "Input(s) non valide(s)" });
        }

        /* Check booking */
        const bookingByDeskByDate = await bookingController.getBookingByDeskByDate(idDesk, date);
        const bookingByUserByDate = await bookingController.getBookingByUserByDate(idUser, date)
        if (bookingByDeskByDate) {
            return res.status(400).json({ error: "Ce bureau est déjà réservé à cette date" });
        } else if(bookingByUserByDate) {
            return res.status(400).json({ error: "Tu as déjà réservé à cette date" });
        }
        else {

            console.log("booking is available")

            const booking = await bookingController.createBooking(idUser,idDesk,date);

            return res.status(200).json({
                success: true,
                booking
            });
        
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Impossible de réserver le bureau"
        });
    }
};