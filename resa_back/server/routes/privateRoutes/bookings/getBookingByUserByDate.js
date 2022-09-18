require('dotenv').config();
const userController = require('../../../controllers/userController');
const bookingController = require('../../../controllers/bookingController');


module.exports = async (req, res) => {
    try {
        
        const date = req.query.date;
        const trigramme = req.query.trigramme;

        const user = await userController.getUserByName(trigramme);

        const userBooking = await bookingController.getBookingByUserByDate(user._id, date);

        console.log(userBooking);


        return res.status(200).json({
            success: true,
            userBooking
        });
        
    }
    catch (error) {
        return res.status(500).json({
            error: "Impossible de récupérer la réservation de l'utilisateur "
        });
    }
};