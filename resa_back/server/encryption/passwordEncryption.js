const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

const passwordEncryption = async (password) => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        throw error;
    }
};

const passwordCompare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
};

const validationCode = (name) => {
    const r = Math.floor(Math.random() * Math.floor(1000));
    const str = name + "memomental" + r.toString();
    const code = bcrypt.hashSync(str, SALT_ROUNDS);
    return code.slice(8, 16).split('.').join('-').split('/').join('*');
};

const tempPassword = (mail) => {
    const r = Math.floor(Math.random() * Math.floor(1000));
    const str = mail + "memomental" + r.toString();
    const pass = bcrypt.hashSync(str, SALT_ROUNDS);
    return pass.slice(8, 16).split('.').join('-').split('/').join('*');
};

module.exports = {
    passwordEncryption,
    passwordCompare,
    validationCode,
    tempPassword
};