import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import path from 'path';

const mailGenerator = new Mailgen({
  theme: {
    path: path.join(process.cwd(), 'node_modules/mailgen/themes/default/index.html'),
    plaintextPath: path.join(process.cwd(), 'node_modules/mailgen/themes/default/index.txt'),
  },
  product: {
    name: 'Aeron Steels',
    link: 'https://aeronsteels.com',
    copyright: `Copyright © ${new Date().getFullYear()} Aeron Steels. All rights reserved.`,
  },
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const GREEN = '#22BC66';

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  const emailContent = mailGenerator.generate({
    body: {
      name: 'Aeron Steels Team',
      title: `New Contact Form Submission`,
      intro: [
        `You have received a new inquiry from ${data.name}.`,
        `Here are the details:`,
      ],
      table: {
        data: [
          { 'Full Name': data.name },
          { 'Email Address': data.email },
          { 'Subject': data.subject },
        ],
      },
      action: {
        instructions: `Message from ${data.name}:`,
        button: {
          color: GREEN,
          text: `Reply to ${data.name}`,
          link: `mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}`,
        },
      },
      outro: [
        `---`,
        data.message,
        `---`,
        `You can reply directly to this email to respond to the sender.`,
      ],
    },
  });

  await transporter.sendMail({
    from: `"Aeron Steels Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'aeronsteels28@gmail.com',
    subject: `New Inquiry: ${data.subject} from ${data.name}`,
    html: emailContent,
    replyTo: data.email,
  });
}

export async function sendSubmissionAcknowledgment(data: ContactFormData): Promise<void> {
  const emailContent = mailGenerator.generate({
    body: {
      name: data.name,
      title: 'Thank You for Reaching Out!',
      intro: [
        `We have successfully received your inquiry and wanted to let you know that it is now with our team.`,
        `Here is a summary of what you submitted:`,
      ],
      table: {
        data: [
          { 'Subject': data.subject },
          { 'Message': data.message },
        ],
      },
      action: {
        instructions: `We will review your inquiry and get back to you at ${data.email} as soon as possible.`,
        button: {
          color: GREEN,
          text: 'Visit Our Website',
          link: 'https://aeronsteels.com',
        },
      },
      outro: [
        `If you have any urgent concerns, feel free to call us at +91 8307028125.`,
        `Thank you for choosing Aeron Steels.`,
      ],
    },
  });

  await transporter.sendMail({
    from: `"Aeron Steels" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Thank You for Contacting Aeron Steels`,
    html: emailContent,
  });
}
