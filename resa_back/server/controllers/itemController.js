/*
Item Controller handle all action with item database object 
 */
const Item = require('../models/item');

const getItemById = async (_id) => {
    try {
        return await Item.findById(_id);
    } catch (error) {
        throw error;
    }
};

const getAllItems = async () => {
    try {
        return await Item.find();
    } catch (error) {
        throw error;
    }
};

const createItem = async (name, serialNumber) => {
    try {
        const item = new Item({
            name,
            serialNumber
        });
        return await item.save();
    } catch (error) {
        throw error;
    }
};

const deleteItem = async (_id) => {
    try {
        return await Item.deleteOne({ _id })
    } catch (error) {
        throw error;
    }
};

const updateItem = async (informations, idItem) => {
    try {
        return await Item.findByIdAndUpdate(idItem, { ...informations, _id: idItem }, { new: true })
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getItemById,
    getAllItems,
    createItem,
    deleteItem,
    updateItem
};