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
                <p style="margin:12px 0 0;font-size:17px;opacity:0.92;">Your account is now active and ready to build modern digital experiences.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">Hello ${name},</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">Welcome to Aformix.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">We’re excited to have you onboard. Your account is now active and ready to help you build modern digital experiences with powerful web solutions.</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;">Thank you for trusting Aformix.</p>
                <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:24px;">
                  <h2 style="margin:0 0 10px;font-size:18px;color:#f8fafc;">What’s next?</h2>
                  <ul style="margin:0;padding:0 0 0 20px;color:#cbd5e1;font-size:15px;line-height:1.8;">
                    <li>Explore the Aformix dashboard</li>
                    <li>Secure your app with industry-grade auth</li>
                    <li>Build fast, responsive interfaces</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;color:#94a3b8;font-size:14px;line-height:1.8;">
                <p style="margin:0 0 8px;">Aformix</p>
                <p style="margin:0 0 16px;">Modern digital experiences built with secure, scalable engineering.</p>
                <p style="margin:0;font-size:12px;opacity:0.75;">Security notice: If you did not sign in to Aformix, please contact support immediately.</p>
                <div style="margin-top:18px;display:flex;gap:12px;justify-content:center;">
                  <span style="display:inline-block;width:38px;height:38px;background:#111827;border-radius:12px;line-height:38px;text-align:center;color:#f8fafc;font-size:14px;">FB</span>
                  <span style="display:inline-block;width:38px;height:38px;background:#111827;border-radius:12px;line-height:38px;text-align:center;color:#f8fafc;font-size:14px;">TW</span>
                  <span style="display:inline-block;width:38px;height:38px;background:#111827;border-radius:12px;line-height:38px;text-align:center;color:#f8fafc;font-size:14px;">LN</span>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
