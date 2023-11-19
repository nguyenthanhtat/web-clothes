const nodeMailer = require('nodemailer')


exports.sendMail = (to,subject,htmlContent)=>{
     const transport = nodeMailer.createTransport({
          host:'smtp.gmail.com',
          port:465,
          secure:true,
          auth:{
               user:'nguyenthanhtat147@gmail.com',
               pass:'hpsrdqsxgppswlti',
          }
     })
     const options = {
          from:'nguyenthanhtat147@gmail.com',
          to:to,
          subject:subject,
          html:htmlContent
     }
     console.log('options', options)
     return transport.sendMail(options)
}