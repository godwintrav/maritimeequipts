const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLEAPI_CLIENT_ID, process.env.GOOGLEAPI_CLIENT_SECRET, process.env.GOOGLEAPI_REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: process.env.GOOGLEAPI_REFRESH_TOKEN});

module.exports.sendOrderEmail = async (fullname, products) => {
    let stringTxt = "";
    for(let index = 0; index < products.length; index++){
        stringTxt += "<p>" + products[index].name + ": " + products[index].price;
    }

    try {
        var htmlString = '<!DOCTYPE html><html><head><title>New Order Notification</title><style type="text/css">body{font-family: verdana;}</style></head><body style="background-color: #fff; margin: 0 auto;"><center><table style="width: 100%; background-color: #; margin: 0 auto;"><tr><th><h1 style="background-color: red; color: white; padding: 10px;">Maritime E-Commerce Store</h1></th></tr><tr><td style="font-size: 18px;"><h2 style="color: grey; text-align: center;">New Order from ' + fullname + '</h2><h4 style="color: grey; text-align: center;">Items:</h4>' + stringTxt + '</td></tr></table></center></body></html>';
        const accessToken = await oAuth2Client.getAccessToken;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: "smtp.ethereal.email",
            // port: 465,
            // secure: true, // true for 465, false for other ports
            auth: {
                type: 'OAuth2',
                user: 'stanchidi373@gmail.com',
                clientId: process.env.GOOGLEAPI_CLIENT_ID,
                clientSecret: process.env.GOOGLEAPI_CLIENT_SECRET,
                refreshToken: process.env.GOOGLEAPI_REFRESH_TOKEN,
                accessToken: accessToken
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Maritime E-commerce Store" <maritimeequipts.cn@hotmail.com>', // sender address
            to: "maritimeequipts.cn@hotmail.com", // list of receivers
            subject: "New order notification ✔", // Subject line
            text: "New order notification ", // plain text body
            html: htmlString, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    }catch(error){
        throw Error(error.message);
    }

}