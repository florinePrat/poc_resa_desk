/*
Item Controller handle all action with desk database object 
 */
const Desk = require('../models/desk');

const getDeskById = async (_id) => {
    try {
        return await Desk.findById(_id);
    } catch (error) {
        throw error;
    }
};

const getDeskByName = async (name) => {
    try {
        return await Desk.findOne({name});
    } catch (error) {
        throw error;
    }
};

const getAllDesks = async () => {
    try {
        return await Desk.find();
    } catch (error) {
        throw error;
    }
};

const getAllAvailableDesks = async (idBookedDesks) => {
    try {
        return await Desk.find({ _id: { $nin: idBookedDesks } })
    } catch (error) {

    }
}

const createDesk = async (name, location, itemList) => {
    try {
        const desk = new Desk({
            name,
            location,
            itemList
        });
        return await desk.save();
    } catch (error) {
        throw error;
    }
};

const deleteDesk = async (_id) => {
    try {
        return await Desk.deleteOne({ _id })
    } catch (error) {
        throw error;
    }
};

const updateDesk = async (informations, idDesk) => {
    try {
        return await Desk.findByIdAndUpdate(idDesk, { ...informations, _id: idDesk }, { new: true })
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getDeskById,
    getDeskByName,
    getAllAvailableDesks,
    getAllDesks,
    createDesk,
    deleteDesk,
    updateDesk
};