const nodemailer = require('nodemailer');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@ridgeclimb.kg';
const FROM_EMAIL = process.env.SMTP_FROM || 'RidgeClimb Adventures <info@ridgeclimb.kg>';

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

// Shared branded email shell — blue header matches site primary color
function emailShell(bodyHtml) {
  return `
  <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
    <div style="background: #1A5C9E; padding: 24px 32px;">
      <h1 style="color: #ffffff; margin: 0; font-family: 'Montserrat', Arial, sans-serif; font-size: 20px;">
        RidgeClimb Adventures
      </h1>
    </div>
    <div style="padding: 32px; color: #1A1A2E; line-height: 1.6;">
      ${bodyHtml}
    </div>
    <div style="background: #F8FAFC; padding: 20px 32px; color: #4B5563; font-size: 13px; border-top: 1px solid #E2E8F0;">
      123 Mountain Road, Bishkek, Kyrgyzstan 720000<br />
      +996 200 000 456 · info@ridgeclimb.kg
    </div>
  </div>`;
}

async function sendMail({ to, subject, html }) {
  // In development without SMTP configured, log instead of throwing
  if (!process.env.SMTP_HOST) {
    console.log(`[emailService] SMTP not configured — would send "${subject}" to ${to}`);
    return;
  }
  await getTransporter().sendMail({ from: FROM_EMAIL, to, subject, html });
}

async function sendBookingConfirmation(booking, expedition) {
  const userHtml = emailShell(`
    <h2 style="font-family: 'Montserrat', Arial, sans-serif;">Booking Received!</h2>
    <p>Hi ${booking.fullName},</p>
    <p>Thank you for booking with RidgeClimb Adventures. Here are your details:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr><td style="padding: 6px 0; color: #4B5563;">Booking ID</td><td style="padding: 6px 0; font-weight: 600;">${booking.id}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Expedition</td><td style="padding: 6px 0; font-weight: 600;">${expedition.title}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Package</td><td style="padding: 6px 0; font-weight: 600;">${booking.package}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Status</td><td style="padding: 6px 0; font-weight: 600;">${booking.status}</td></tr>
    </table>
    <p>Our team will be in touch shortly to confirm logistics and next steps.</p>
  `);

  const adminHtml = emailShell(`
    <h2 style="font-family: 'Montserrat', Arial, sans-serif;">New Booking</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr><td style="padding: 6px 0; color: #4B5563;">Booking ID</td><td style="padding: 6px 0; font-weight: 600;">${booking.id}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Expedition</td><td style="padding: 6px 0; font-weight: 600;">${expedition.title}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Package</td><td style="padding: 6px 0; font-weight: 600;">${booking.package}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Name</td><td style="padding: 6px 0; font-weight: 600;">${booking.fullName}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Email</td><td style="padding: 6px 0; font-weight: 600;">${booking.email}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${booking.phone || '—'}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Message</td><td style="padding: 6px 0;">${booking.message || '—'}</td></tr>
    </table>
  `);

  await Promise.all([
    sendMail({ to: booking.email, subject: 'Your RidgeClimb booking confirmation', html: userHtml }),
    sendMail({ to: ADMIN_EMAIL, subject: `New booking — ${expedition.title}`, html: adminHtml }),
  ]);
}

async function sendInquiryNotification(inquiry) {
  const adminHtml = emailShell(`
    <h2 style="font-family: 'Montserrat', Arial, sans-serif;">New Contact Inquiry</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr><td style="padding: 6px 0; color: #4B5563;">Name</td><td style="padding: 6px 0; font-weight: 600;">${inquiry.fullName}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Email</td><td style="padding: 6px 0; font-weight: 600;">${inquiry.email}</td></tr>
      <tr><td style="padding: 6px 0; color: #4B5563;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${inquiry.phone || '—'}</td></tr>
    </table>
    <p style="color: #4B5563;">Message:</p>
    <p>${inquiry.message}</p>
  `);

  const userHtml = emailShell(`
    <h2 style="font-family: 'Montserrat', Arial, sans-serif;">We've received your message</h2>
    <p>Hi ${inquiry.fullName},</p>
    <p>Thank you for reaching out to RidgeClimb Adventures. We've received your inquiry and will respond within 24 hours.</p>
    <p>Until then, feel free to explore our <a href="https://ridgeclimb.kg/expeditions" style="color: #1A5C9E;">expeditions</a>.</p>
  `);

  await Promise.all([
    sendMail({ to: ADMIN_EMAIL, subject: 'New contact inquiry', html: adminHtml }),
    sendMail({ to: inquiry.email, subject: "We've received your message — RidgeClimb Adventures", html: userHtml }),
  ]);
}

module.exports = { sendBookingConfirmation, sendInquiryNotification };
