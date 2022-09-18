require('dotenv').config();
const deskController = require('../../../controllers/deskController');
const bookingController = require('../../../controllers/bookingController');


module.exports = async (req, res) => {
    try {
        
        console.log(req.query.date)
        const date = req.query.date;
        console.log(date);

        const bookedDesks = await bookingController.getAllBookedDeskByDate(date);

        const availableDesks = await deskController.getAllAvailableDesksByDepartment(bookedDesks, req.query.department);

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