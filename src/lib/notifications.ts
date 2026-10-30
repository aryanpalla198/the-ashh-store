import { Order } from '@/types';

/**
 * Dispatches transactional emails (Order confirmation, status change, invoice)
 * Uses Nodemailer / SendGrid adapter with console log fallback in dev/sandbox
 */
export async function sendEmailNotification({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  console.log(`[EMAIL DISPATCH] To: ${to} | Subject: ${subject}`);
  // In a real cloud setup, SendGrid or Nodemailer sends email;
  // here we log structured details and return success
  return { success: true, messageId: `msg_${Date.now()}` };
}

/**
 * Dispatches transactional SMS & OTPs via MSG91 / Twilio
 */
export async function sendSMSNotification({
  phone,
  message,
}: {
  phone: string;
  message: string;
}) {
  console.log(`[SMS DISPATCH] To: +91 ${phone} | Content: "${message}"`);
  return { success: true, requestId: `sms_${Date.now()}` };
}

/**
 * Sends order placed confirmation via email & SMS
 */
export async function sendOrderPlacedAlerts(order: Order) {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #E11B23; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">The Ashh Store</h1>
        <p style="margin: 5px 0 0; font-size: 14px;">Order Confirmed! 🎉</p>
      </div>
      <div style="padding: 24px; color: #1f2937;">
        <p>Hey <strong>${order.customer.name}</strong>,</p>
        <p>Thank you for shopping with us! Your order <strong>#${order.orderNumber}</strong> has been secured and is being prepped for dispatch.</p>
        <div style="background: #f9fafb; padding: 16px; border-radius: 6px; margin: 16px 0;">
          <h3 style="margin-top: 0;">Order Summary</h3>
          <p>Total Items: ${order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
          <p>Payment Method: ${order.paymentMethod.toUpperCase()} (${order.paymentStatus})</p>
          <p><strong>Grand Total: ₹${order.grandTotal}</strong></p>
          <p>Shipping to: ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
        </div>
        <p>You can track your order live anytime on our portal.</p>
      </div>
    </div>
  `;

  await sendEmailNotification({
    to: order.customer.email,
    subject: `Order Confirmed: #${order.orderNumber} - The Ashh Store`,
    html: emailHtml,
  });

  await sendSMSNotification({
    phone: order.customer.phone,
    message: `Hey ${order.customer.name}, order #${order.orderNumber} for ₹${order.grandTotal} is confirmed! Track live at theashhstore.com/track-order.`,
  });
}
