import nodemailer from "nodemailer";

type Env = {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  emailFrom: string;
  adminEmail: string;
};

function getEnv(): Env {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM || "Lanka Lagoon Tours <info@lankalagoontours.lk>";
  const adminEmail = process.env.ADMIN_EMAIL || "info@lankalagoontours.lk";

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error("Missing SMTP configuration environment variables");
  }

  return {
    smtpHost,
    smtpPort: Number(smtpPort),
    smtpSecure,
    smtpUser,
    smtpPass,
    emailFrom,
    adminEmail,
  };
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;

  const env = getEnv();
  transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  return transporter;
}

export interface BookingEmailData {
  bookingNumber: string;
  tourTitle: string;
  bookingDate: string;
  departureTime: string;
  guestCount: number;
  totalPrice: number;
  currency: string;
  leadName: string;
  email: string;
  phone: string;
  remarks: string;
  status: string;
  passengers: {
    firstName: string;
    lastName: string;
    country: string;
    isLead: boolean;
  }[];
}

function buildCustomerHtml(data: BookingEmailData) {
  const passengersRows = data.passengers
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(p.firstName)} ${escapeHtml(p.lastName)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${p.isLead ? '<span style="display:inline-block;padding:2px 8px;border-radius:999px;background:#c9862f;color:#0f2e2c;font-size:11px;font-weight:600;">Lead</span>' : "—"}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${escapeHtml(p.country)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmation</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f6f6f6; color: #0f2e2c; }
    .container { max-width: 640px; margin: 0 auto; padding: 24px; }
    .card { background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e5e7eb; }
    .brand { font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 700; color: #0f2e2c; }
    .brand span { color: #c9862f; }
    .eyebrow { display: inline-block; margin-top: 16px; padding: 6px 12px; border-radius: 999px; background: #c9862f; color: #0f2e2c; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
    .title { margin-top: 16px; font-size: 24px; font-weight: 700; color: #0f2e2c; }
    .subtitle { margin-top: 8px; font-size: 14px; color: #4b5563; }
    .section-title { margin-top: 24px; margin-bottom: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #a86c1f; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 12px; }
    .cell { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; }
    .value { margin-top: 6px; font-size: 15px; font-weight: 600; color: #0f2e2c; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table th { text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; border-bottom: 2px solid #e5e7eb; }
    .total-box { margin-top: 24px; padding: 18px; border-radius: 12px; background: #0f2e2c; color: #ffffff; }
    .total-box .label { color: #c9862f; }
    .total-box .value { color: #ffffff; font-size: 20px; }
    .note { margin-top: 24px; font-size: 13px; color: #4b5563; line-height: 1.5; }
    .footer { margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="brand">Lanka <span>Lagoon</span> Tours</div>
      <div class="eyebrow">Booking Received</div>
      <div class="title">Thank you, ${escapeHtml(data.leadName)}!</div>
      <div class="subtitle">We've received your booking request. Here are your tour details for your records.</div>

      <div class="section-title">Booking Overview</div>
      <div class="grid">
        <div class="cell">
          <div class="label">Booking Number</div>
          <div class="value">${escapeHtml(data.bookingNumber)}</div>
        </div>
        <div class="cell">
          <div class="label">Status</div>
          <div class="value">Pending Confirmation</div>
        </div>
        <div class="cell">
          <div class="label">Tour</div>
          <div class="value">${escapeHtml(data.tourTitle)}</div>
        </div>
        <div class="cell">
          <div class="label">Date & Time</div>
          <div class="value">${escapeHtml(data.bookingDate)} · ${escapeHtml(data.departureTime)}</div>
        </div>
        <div class="cell">
          <div class="label">Guests</div>
          <div class="value">${data.guestCount}</div>
        </div>
        <div class="cell">
          <div class="label">Lead Contact</div>
          <div class="value">${escapeHtml(data.phone)}</div>
        </div>
      </div>

      <div class="total-box">
        <div class="label">Total Amount</div>
        <div class="value">${data.currency} ${data.totalPrice.toLocaleString()}</div>
      </div>

      <div class="section-title">Passengers</div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th style="text-align:center;">Role</th>
            <th style="text-align:center;">Country</th>
          </tr>
        </thead>
        <tbody>${passengersRows}</tbody>
      </table>

      ${data.remarks ? `<div class="note"><strong>Remarks:</strong> ${escapeHtml(data.remarks)}</div>` : ""}

      <div class="note">
        <strong>What happens next?</strong><br />
        Our team will review your booking and confirm availability shortly. You will receive a confirmation call or email once your booking is confirmed. Payment will be collected after confirmation.
      </div>

      <div class="note">
        Questions? Contact us at <a href="mailto:info@lankalagoontours.lk" style="color:#c9862f;text-decoration:underline;">info@lankalagoontours.lk</a> or call +94 76 344 3826.
      </div>

      <div class="footer">Lanka Lagoon Tours · Vibrant House 16 Canal Road, Palagathura, Kochchikade, Negombo, Sri Lanka 11500.</div>
    </div>
  </div>
</body>
</html>`;
}

function buildAdminHtml(data: BookingEmailData, adminUrl?: string) {
  const passengersRows = data.passengers
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(p.firstName)} ${escapeHtml(p.lastName)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${p.isLead ? '<span style="display:inline-block;padding:2px 8px;border-radius:999px;background:#c9862f;color:#0f2e2c;font-size:11px;font-weight:600;">Lead</span>' : "—"}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${escapeHtml(p.country)}</td>
        </tr>`
    )
    .join("");

  const actionLink = adminUrl
    ? `<div style="margin-top:20px;"><a href="${escapeHtml(adminUrl)}" style="display:inline-block;padding:10px 18px;border-radius:10px;background:#0f2e2c;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;">View Booking in Admin</a></div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Booking Notification</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f6f6f6; color: #0f2e2c; }
    .container { max-width: 640px; margin: 0 auto; padding: 24px; }
    .card { background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e5e7eb; }
    .brand { font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 700; color: #0f2e2c; }
    .brand span { color: #c9862f; }
    .eyebrow { display: inline-block; margin-top: 16px; padding: 6px 12px; border-radius: 999px; background: #c9862f; color: #0f2e2c; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
    .title { margin-top: 16px; font-size: 24px; font-weight: 700; color: #0f2e2c; }
    .subtitle { margin-top: 8px; font-size: 14px; color: #4b5563; }
    .section-title { margin-top: 24px; margin-bottom: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #a86c1f; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 12px; }
    .cell { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; }
    .value { margin-top: 6px; font-size: 15px; font-weight: 600; color: #0f2e2c; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table th { text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; border-bottom: 2px solid #e5e7eb; }
    .total-box { margin-top: 24px; padding: 18px; border-radius: 12px; background: #0f2e2c; color: #ffffff; }
    .total-box .label { color: #c9862f; }
    .total-box .value { color: #ffffff; font-size: 20px; }
    .note { margin-top: 18px; font-size: 13px; color: #4b5563; line-height: 1.5; }
    .footer { margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="brand">Lanka <span>Lagoon</span> Tours</div>
      <div class="eyebrow">Admin Alert</div>
      <div class="title">New Booking Received</div>
      <div class="subtitle">A new tour booking has just been placed and requires your attention.</div>

      <div class="section-title">Booking Details</div>
      <div class="grid">
        <div class="cell">
          <div class="label">Booking Number</div>
          <div class="value">${escapeHtml(data.bookingNumber)}</div>
        </div>
        <div class="cell">
          <div class="label">Status</div>
          <div class="value">${escapeHtml(data.status)}</div>
        </div>
        <div class="cell">
          <div class="label">Tour</div>
          <div class="value">${escapeHtml(data.tourTitle)}</div>
        </div>
        <div class="cell">
          <div class="label">Date & Time</div>
          <div class="value">${escapeHtml(data.bookingDate)} · ${escapeHtml(data.departureTime)}</div>
        </div>
        <div class="cell">
          <div class="label">Guests</div>
          <div class="value">${data.guestCount}</div>
        </div>
        <div class="cell">
          <div class="label">Lead Passenger</div>
          <div class="value">${escapeHtml(data.leadName)}</div>
        </div>
      </div>

      <div class="total-box">
        <div class="label">Total Amount</div>
        <div class="value">${data.currency} ${data.totalPrice.toLocaleString()}</div>
      </div>

      <div class="section-title">Passengers</div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th style="text-align:center;">Role</th>
            <th style="text-align:center;">Country</th>
          </tr>
        </thead>
        <tbody>${passengersRows}</tbody>
      </table>

      <div class="section-title">Customer Contact</div>
      <div class="grid">
        <div class="cell">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color:#c9862f;text-decoration:underline;">${escapeHtml(data.email)}</a></div>
        </div>
        <div class="cell">
          <div class="label">Phone</div>
          <div class="value">${escapeHtml(data.phone)}</div>
        </div>
      </div>

      ${data.remarks ? `<div class="note"><strong>Remarks:</strong> ${escapeHtml(data.remarks)}</div>` : ""}
      ${actionLink}

      <div class="footer">Lanka Lagoon Tours · Vibrant House 16 Canal Road, Palagathura, Kochchikade, Negombo, Sri Lanka 11500.</div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendBookingCustomerEmail(data: BookingEmailData) {
  const env = getEnv();
  const transporter = getTransporter();

  const subject = `Booking Confirmation: ${data.tourTitle} — ${data.bookingNumber}`;

  await transporter.sendMail({
    from: env.emailFrom,
    to: data.email,
    subject,
    html: buildCustomerHtml(data),
    text: buildCustomerText(data),
  });
}

export async function sendBookingAdminEmail(data: BookingEmailData, adminUrl?: string) {
  const env = getEnv();
  const transporter = getTransporter();

  const subject = `New Booking Alert: ${data.tourTitle} — ${data.bookingNumber}`;

  await transporter.sendMail({
    from: env.emailFrom,
    to: env.adminEmail,
    subject,
    html: buildAdminHtml(data, adminUrl),
    text: buildAdminText(data),
  });
}

function buildCustomerText(data: BookingEmailData): string {
  return `Lanka Lagoon Tours - Booking Received

Booking Number: ${data.bookingNumber}
Status: Pending Confirmation

Tour: ${data.tourTitle}
Date: ${data.bookingDate}
Time: ${data.departureTime}
Guests: ${data.guestCount}
Total: ${data.currency} ${data.totalPrice}

Passengers:
${data.passengers.map((p, i) => `${i + 1}. ${p.firstName} ${p.lastName} (${p.country})${p.isLead ? " - Lead" : ""}`).join("\n")}

Lead Contact: ${data.leadName}
Phone: ${data.phone}
Email: ${data.email}
${data.remarks ? `Remarks: ${data.remarks}\n` : ""}

We will confirm your booking shortly via phone or email.`;
}

function buildAdminText(data: BookingEmailData): string {
  return `Lanka Lagoon Tours - New Booking Alert

Booking Number: ${data.bookingNumber}
Status: ${data.status}

Tour: ${data.tourTitle}
Date: ${data.bookingDate}
Time: ${data.departureTime}
Guests: ${data.guestCount}
Total: ${data.currency} ${data.totalPrice}

Passengers:
${data.passengers.map((p, i) => `${i + 1}. ${p.firstName} ${p.lastName} (${p.country})${p.isLead ? " - Lead" : ""}`).join("\n")}

Lead Contact: ${data.leadName}
Phone: ${data.phone}
Email: ${data.email}
${data.remarks ? `Remarks: ${data.remarks}\n` : ""}`;
}
