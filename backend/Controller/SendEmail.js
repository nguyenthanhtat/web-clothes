const nodeMailer =require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

require('dotenv').config();
const sendEmail = async (options) => {
    const transport = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        secure:false,//use SSL
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,


        },
        tls:{
            rejectUnauthorized:false,
        },

    });
    const handlebarOptions = {
        viewEngine:{
            extName:'.html',
            partialsDir:path.resolve('./view'),
            defaultLayout:false,
        },
        viewPath:path.resolve('./views'),
        extName:'.html',
    };

    transport.use('compile',hbs(handlebarOptions));
    const mailOptions ={
        from:options.emailFrom,
        to:options.emailTo,
        subject:options.subject,
        attachments:options.attachments,
        template:options.template,
        context:options.context,
        html:options.html,

    };
    await transport.sendEmail(mailOptions);
};
module.exports = sendEmail;

