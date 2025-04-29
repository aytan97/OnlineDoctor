const nodemailer = require('nodemailer')
// const verifyMailSender = async (email, title, html = null) => {
//   try {
//     // Create a Transporter to send emails
//     let verificationTransporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     })
//     // Send emails to users

//     let info = await verificationTransporter.sendMail({
//       from: '"Doctor Online" <aytan.sh.aa@gmail.com>',
//       to: email,
//       subject: title,
//       html: html,
//     })
//     console.log('Email info: ', info)
//     return info
//   } catch (error) {
//     console.log(error.message)
//   }
// }
// module.exports = verifyMailSender

////////////////////////////////////////////////////////////////////////////////////////////////
//send email after successful registration

async function sendMail(to, subject, text = null, html = null) {
  // SMTP sunucu ayarları
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  // E-posta gönderme ayarları
  let info = await transporter.sendMail({
    from: '"Doctor Online" aytan.sh.aa@gmail.com',
    to: to, // Gönderilecek kişi
    subject: subject, // E-posta konusu
    text: text, // E-posta içeriği (text formatı)
    html: html, // E-posta içeriği (html formatı)
  })

  console.log('E-posta gönderildi: %s', info.messageId)
}

module.exports = sendMail
