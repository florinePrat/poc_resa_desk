require('dotenv').config();
const deskController = require('../../../controllers/deskController');
const bookingController = require('../../../controllers/bookingController');


module.exports = async (req, res) => {
    try {

        const date = req.query.date;
        console.log({date})

        const allDesks = await deskController.getAllDesks();
        console.log({allDesks})

        const bookedDesks = await bookingController.getAllBookedDeskByDate(date);
        console.log({bookedDesks})

        const availableDesks = await deskController.getAllAvailableDesks(bookedDesks);
        console.log({availableDesks})


        return res.status(200).json({
            success: true,
            availableDesks
        });
        
    }
    catch (error) {
        return res.status(500).json({
            error: "Impossible de récupérer les bureaux disponibles"
        });
    }
};