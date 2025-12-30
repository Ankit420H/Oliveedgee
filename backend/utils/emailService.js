import nodemailer from 'nodemailer';

// Create a transporter using Ethereal for testing (or Gmail if configured)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
    pass: process.env.SMTP_PASS || 'ethereal.pass'
  }
});

const sendEmail = async (to, subject, htmlContent) => {
  // Graceful fallback if credentials are missing or default
  if (!process.env.SMTP_HOST || process.env.SMTP_HOST.includes('ethereal')) {
    // console.warn('[EMAIL] SMTP Configuration missing or using Ethereal. Email simulation: success.');
    // console.log(`[EMAIL SIMULATION] To: ${to}, Subject: ${subject}`);
    return true;
  }

  try {
    const mailOptions = {
      from: '"Olive Edge" <concierge@oliveedge.com>',
      to,
      subject,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    // console.log(`[EMAIL] Sent to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('[EMAIL] Send Error:', error.message);
    // Don't throw, just return false so the app doesn't crash
    return false;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Olive Edge';
  const html = `
        <div style="font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #fcfbf5;">
            <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 20px; letter-spacing: 1px;">OLIVE EDGE</h1>
            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">Dear ${name},</p>
            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">
                We are pleased to welcome you to our digital flagship. 
                Your account has been successfully created, granting you access to our curated selection of technical equipment.
            </p>
            <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            <p style="font-family: 'Helvetica', sans-serif; font-size: 12px; color: #777;">
                Should you require assistance, our concierge is available at support@oliveedge.com.
            </p>
        </div>
    `;
  return sendEmail(email, subject, html);
};

export const sendOrderConfirmationEmail = async (email, name, order) => {
  const subject = `Order Confirmation #${order._id}`;

  const itemsHtml = order.orderItems.map(item => `
    <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; font-family: 'Helvetica', sans-serif; font-size: 14px;">
            ${item.name} <br>
            <span style="font-size: 12px; color: #888;">Qty: ${item.qty}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; font-family: 'Helvetica', sans-serif; font-size: 14px; text-align: right;">
            ₹${item.price}
        </td>
    </tr>
  `).join('');

  const html = `
        <div style="font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #fcfbf5;">
            <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 20px; letter-spacing: 1px; text-transform: uppercase;">Olive Edge</h1>
            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">Dear ${name},</p>
            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">
                Thank you for your acquisition. This email confirms that we have received your order <strong>#${order._id}</strong>.
            </p>
            
            <div style="margin: 30px 0; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
                <h3 style="font-family: 'Helvetica', sans-serif; font-size: 16px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Receipt</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="padding: 15px 10px; text-align: right; font-family: 'Helvetica', sans-serif; font-size: 14px; font-weight: bold;">Total</td>
                            <td style="padding: 15px 10px; text-align: right; font-family: 'Helvetica', sans-serif; font-size: 16px; font-weight: bold;">₹${order.totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">
                We are currently preparing your items for dispatch. You will receive a separate notification once shipment is underway.
            </p>
            <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            <p style="font-family: 'Helvetica', sans-serif; font-size: 12px; color: #777;">
                Olive Edge | Digital Flagship
            </p>
        </div>
    `;
  return sendEmail(email, subject, html);
};

export const sendOrderDeliveredEmail = async (email, name, order) => {
  const subject = `Shipment Delivered - Order #${order._id}`;

  // Simpler list for delivery notification
  const itemsHtml = order.orderItems.map(item => `
        <li style="margin-bottom: 10px; font-family: 'Helvetica', sans-serif; font-size: 14px; color: #555;">
             ${item.name} <span style="color: #999;">(x${item.qty})</span>
        </li>
    `).join('');

  const html = `
        <div style="font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #fcfbf5;">
            <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 20px; letter-spacing: 1px; text-transform: uppercase;">Olive Edge</h1>
            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">Dear ${name},</p>
            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">
                We are pleased to inform you that your acquisition <strong>#${order._id}</strong> has been successfully delivered.
            </p>
            
            <div style="margin: 30px 0; padding: 20px; background: #fff; border: 1px solid #eee; border-radius: 4px;">
                 <h3 style="font-family: 'Helvetica', sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; color: #888;">Manifest</h3>
                 <ul style="padding-left: 20px; margin: 10px 0 0 0;">
                    ${itemsHtml}
                 </ul>
            </div>

            <p style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; color: #555;">
                We trust the equipment meets your exacting standards. Should you require any assistance, please do not hesitate to contact our concierge.
            </p>
            
            <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            <p style="font-family: 'Helvetica', sans-serif; font-size: 12px; color: #777;">
                Olive Edge | Digital Flagship
            </p>
        </div>
    `;
  return sendEmail(email, subject, html);
};
