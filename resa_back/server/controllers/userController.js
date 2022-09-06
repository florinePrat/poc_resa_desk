/*
User Controller handle all action with user database object 
 */
const User = require('../models/user');
const passwordEncryption = require('../encryption/passwordEncryption');

const getUserById = async (_id) => {
    try {
        return await User.findById(_id);
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (mail) => {
    try {
        console.log('here 2')
        const user = await User.findOne({mail})
        console.log({user})
        return user
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw error;
    }
};

const getUserByName = async (name) => {
    try {
        return await User.find({ name });
    } catch (error) {
        throw error;
    }
};

const createUser = async (name, mail, password, notification, resp) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(password);
    try {
        const user = new User({
            name,
            mail,
            password: hashedPassword,
            notification,
            resp
        });
        return await user.save();
    } catch (error) {
        throw error;
    }
};

const creatNewPass = async (mail, newPass) => {
    const hashedPassword = await passwordEncryption.passwordEncryption(newPass);
    try {
        return await User.findOneAndUpdate({ mail: mail }, { password: hashedPassword }, { new: true })
    } catch (error) {
        throw error;
    }
};

const createPassword = async (_id, password) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(password);
        return await User.findOneAndUpdate({ _id: _id }, { password: hashedPassword }, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (_id) => {
    try {
        return await User.deleteOne({ _id })
    } catch (error) {
        throw error;
    }
};

const updateUser = async (informations, idUser) => {
    try {
        return await User.findByIdAndUpdate(idUser, { ...informations, _id: idUser }, { new: true })
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserById,
    getUserByEmail,
    getAllUsers,
    getUserByName,
    createUser,
    creatNewPass,
    createPassword,
    deleteUser,
    updateUser
};