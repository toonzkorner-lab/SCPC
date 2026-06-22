import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, body } = await request.json();

    // In a real production environment, you would use environment variables:
    // const smtpHost = process.env.SMTP_HOST;
    // const smtpUser = process.env.SMTP_USER;
    // const smtpPass = process.env.SMTP_PASS;

    // For now, we simulate sending by logging to the console (Mock Mode)
    // If credentials exist, we send it for real.
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`, // sender address
        to: 'sales@scpcinc.com',      // list of receivers
        subject: `Website Inquiry: ${subject}`, // Subject line
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${body}`, // plain text body
      });
      
      console.log('Real email sent via SMTP!');
    } else {
      console.log('\n--- MOCK EMAIL SENT ---');
      console.log(`To: sales@scpcinc.com`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${body}`);
      console.log('-----------------------\n');
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
  }
}
