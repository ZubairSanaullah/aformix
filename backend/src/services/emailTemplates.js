export const otpVerificationTemplate = (name, otp) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Aformix Account</title>
  </head>
  <body style="margin:0;padding:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#070b16;color:#f7f9ff;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f172a;border-radius:24px;overflow:hidden;box-shadow:0 18px 60px rgba(15,23,42,0.35);">
            <tr>
              <td style="padding:32px;background:linear-gradient(135deg, #5b9df9, #8b5cf6);color:#fff;text-align:center;">
                <h1 style="margin:0;font-size:28px;letter-spacing:-0.02em;">Verify Your Aformix Account</h1>
                <p style="margin:12px 0 0;font-size:16px;opacity:0.9;">Welcome to Aformix, ${name}. Use the OTP below to complete your sign-up.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Use the following OTP to verify your Aformix account.</p>
                <div style="display:flex;justify-content:center;align-items:center;padding:24px 0;">
                  <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:24px 32px;max-width:320px;width:100%;text-align:center;">
                    <p style="margin:0 0 12px;color:#94a3b8;font-size:14px;letter-spacing:0.12em;text-transform:uppercase;">Your secure OTP</p>
                    <p style="margin:0;font-size:42px;letter-spacing:0.2em;font-weight:700;color:#f8fafc;">${otp}</p>
                  </div>
                </div>
                <p style="margin:0 0 20px;font-size:15px;color:#cbd5e1;">This code expires in 10 minutes. If you did not request this, please ignore this email.</p>
                <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;" />
                <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.8;">Aformix protects your digital workflow with premium-grade verification. Your security is our priority.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;color:#94a3b8;font-size:13px;line-height:1.8;">
                <p style="margin:0 0 8px;">Aformix Team</p>
                <p style="margin:0;">Build modern experiences with confidence.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const welcomeTemplate = (name) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Aformix</title>
  </head>
  <body style="margin:0;padding:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#040617;color:#f8fafc;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#0c1223;border-radius:28px;overflow:hidden;box-shadow:0 20px 70px rgba(4,6,23,0.45);">
            <tr>
              <td style="padding:36px;background:linear-gradient(135deg, #10b981, #2563eb);color:#fff;text-align:center;">
                <h1 style="margin:0;font-size:30px;">Welcome to Aformix 🚀</h1>
                <p style="margin:12px 0 0;font-size:17px;opacity:0.92;">Building Digital Experiences That Drive Results.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">Hello ${name},</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">Welcome to Aformix.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">We're excited to have you join a growing community of businesses, entrepreneurs, and innovators who believe great digital experiences create real business growth.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">At Aformix, we don't just build websites—we create fast, scalable, and conversion-focused digital solutions designed to help brands stand out in an increasingly competitive online world.</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;">Your account is now successfully activated, and you're ready to explore everything we have to offer.</p>
                
                <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:24px;margin-bottom:24px;">
                  <h2 style="margin:0 0 14px;font-size:18px;color:#f8fafc;">What You Can Expect</h2>
                  <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">✓ Modern and high-performance web solutions</p>
                  <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">✓ Secure and scalable development practices</p>
                  <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">✓ Professional support whenever you need assistance</p>
                  <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.6;">✓ Continuous innovation and digital growth opportunities</p>
                </div>
                
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;">Whether you're launching a new idea, upgrading your online presence, or scaling an existing business, we're here to help transform your vision into reality.</p>

                <h3 style="margin:0 0 12px;font-size:18px;color:#f8fafc;">Stay Connected</h3>
                <p style="margin:0 0 8px;font-size:15px;color:#cbd5e1;">Website: <a href="https://aformix.com" style="color:#60a5fa;text-decoration:none;">https://aformix.com</a></p>
                <p style="margin:0 0 8px;font-size:15px;color:#cbd5e1;">WhatsApp: +92 XXX XXXXXXX</p>
                <p style="margin:0 0 16px;font-size:15px;color:#cbd5e1;">Email: <a href="mailto:hello@aformix.com" style="color:#60a5fa;text-decoration:none;">hello@aformix.com</a></p>
                
                <p style="margin:0 0 8px;font-size:15px;color:#cbd5e1;">Instagram: <a href="https://instagram.com/aformix" style="color:#60a5fa;text-decoration:none;">@aformix</a></p>
                <p style="margin:0 0 8px;font-size:15px;color:#cbd5e1;">LinkedIn: <a href="https://linkedin.com/company/aformix" style="color:#60a5fa;text-decoration:none;">Aformix</a></p>
                <p style="margin:0 0 8px;font-size:15px;color:#cbd5e1;">Facebook: <a href="https://facebook.com/aformix" style="color:#60a5fa;text-decoration:none;">Aformix</a></p>
                <p style="margin:0 0 24px;font-size:15px;color:#cbd5e1;">X (Twitter): <a href="https://x.com/aformix" style="color:#60a5fa;text-decoration:none;">@aformix</a></p>

                <h3 style="margin:0 0 12px;font-size:18px;color:#f8fafc;">Need Assistance?</h3>
                <p style="margin:0 0 12px;font-size:16px;line-height:1.75;">Our team is always available to answer questions, discuss projects, or help you get the most out of your experience with Aformix.</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;">Simply reply to this email or reach out through WhatsApp for direct support.</p>

                <p style="margin:0 0 12px;font-size:16px;line-height:1.75;">Thank you for choosing Aformix.</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;">We're looking forward to building something exceptional together.</p>

                <p style="margin:0 0 8px;font-size:16px;line-height:1.75;">Warm regards,</p>
                <p style="margin:0;font-size:16px;line-height:1.75;font-weight:600;">The Aformix Team</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;color:#94a3b8;font-size:14px;line-height:1.8;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
                <p style="margin:0;">Building Digital Experiences That Drive Results.</p>
                <p style="margin:4px 0 0;font-size:12px;opacity:0.75;">© Aformix. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
