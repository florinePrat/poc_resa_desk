/*
Booking Controller handle all action with booking database object 
 */
const Booking = require('../models/booking');

const getBookingById = async (_id) => {
    try {
        return await Booking.findById(_id);
    } catch (error) {
        throw error;
    }
};

const getBookingByUserByDate = async (idUser, date) => {
    try {
        return await Booking.find({idUser, date});
    } catch (error) {
        throw error;
    }
};

const getBookingByDeskByDate = async (idDesk, date) => {
    try {
        return await Booking.find({idDesk, date});
    } catch (error) {
        throw error;
    }
};

const getAllBookings = async () => {
    try {
        return await Booking.find();
    } catch (error) {
        throw error;
    }
};

const getAllBookedDeskByDate = async (date) => {
    try {
        const bookings = await Booking.find({date});
        console.log({bookings})
        const bookedDesks = bookings[idDesk];
        return bookedDesks;

    } catch (error) {
        throw error;
    }
}

const createBooking = async (idUser, idDesk, date) => {
    try {
        const item = new Booking({
            idUser,
            idDesk,
            date
        });
        return await item.save();
    } catch (error) {
        throw error;
    }
};

const deleteBooking = async (_id) => {
    try {
        return await Booking.deleteOne({ _id })
    } catch (error) {
        throw error;
    }
};

const updateBooking = async (informations, idBooking) => {
    try {
        return await Booking.findByIdAndUpdate(idBooking, { ...informations, _id: idBooking }, { new: true })
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getBookingById,
    getBookingByUserByDate,
    getBookingByDeskByDate,
    getAllBookings,
    getAllBookedDeskByDate,
    createBooking,
    deleteBooking,
    updateBooking
};