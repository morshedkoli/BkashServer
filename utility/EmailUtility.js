import nodemailer from "nodemailer";

export async function SendEmail(emailTo, emailText, EmailSubject) {
  const Transport = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    secure: false,
    auth: {
      user: "MS_gdOWdE@trial-3zxk54vk1jpljy6v.mlsender.net",
      pass: "aPoZTLFFn0E899Z2",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let MailOption = {
    from: "MS_gdOWdE@trial-3zxk54vk1jpljy6v.mlsender.net",
    to: emailTo,
    subject: EmailSubject,
    text: emailText,
  };

  return await Transport.sendMail(MailOption);
}
