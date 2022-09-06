const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const auth = require('../../encryption/passwordEncryption');
const userController = require('../../controllers/userController');

module.exports = async (mail) => {
    try {
        const temporary_password = await auth.tempPassword(mail);
        await userController.creatNewPass(mail, temporary_password);
        const msg = {
            to: mail,
            from: 'app.memomental@gmail.com',
            subject: 'Ton nouveau mot de passe !',
            text: 'Tu ne te souvenais plus de ton mot de passe.',
            html: '<h2>Voici ton nouveau mot de passe provisoire : </h2> <strong> ' + temporary_password + ' </strong> <br/><p>Pense à le modifier dans ton profil ! :)</p>',
        };
        await sgMail.send(msg)
        return true;
    } catch (error) {
        return false
    }
};