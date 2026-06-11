export const getWelcomeEmailTemplate = (unsubscribeUrl, websiteUrl) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Aformix</title>
  <style>
    body {
      font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0d0d0d;
      color: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #0d0d0d;
    }
    .card {
      background: linear-gradient(145deg, #161616 0%, #111111 100%);
      border: 1px solid #333333;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
    .logo-container {
      margin-bottom: 30px;
    }
    h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.3;
    }
    .highlight {
      background: linear-gradient(90deg, #31B98F, #00BFDE);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      color: #a3a3a3;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .features {
      text-align: left;
      background: #1a1a1a;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
    }
    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      color: #e5e5e5;
    }
    .feature-icon {
      color: #31B98F;
      margin-right: 12px;
      font-weight: bold;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(90deg, #31B98F 0%, #00BFDE 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 30px;
      transition: opacity 0.3s ease;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #666666;
      border-top: 1px solid #222222;
      padding-top: 24px;
    }
    .footer a {
      color: #00BFDE;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo-container">
        <!-- Assuming you have an absolute URL for your logo -->
        <h2 style="color: #fff; margin:0; font-size: 24px; tracking: 2px; text-transform: uppercase;">Aformix</h2>
      </div>
      
      <h1>Welcome to the <span class="highlight">Insider Network</span> 🚀</h1>
      
      <p>Thank you for joining our exclusive community. You're now on the list to receive our latest insights on AI automation, SaaS development, and digital growth strategies.</p>
      
      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span>Weekly AI & Automation Strategies</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span>Exclusive SaaS Development Trends</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span>SEO & Business Growth Insights</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span>Early access to new services & offers</span>
        </div>
      </div>
      
      <a href="${websiteUrl}" class="btn">Explore Aformix Services</a>
      
      <p style="font-size: 14px;">We're excited to help you future-proof your business.</p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Aformix. All rights reserved.</p>
      <p>You received this email because you subscribed to our newsletter.</p>
      <p>Want to change how you receive these emails?<br>
      <a href="${unsubscribeUrl}">Unsubscribe here</a></p>
    </div>
  </div>
</body>
</html>
  `;
};

export const getVerificationEmailTemplate = (verifyUrl) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your subscription</title>
  <style>
    body {
      font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
      background-color: #0d0d0d;
      color: #ffffff;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background: linear-gradient(145deg, #161616 0%, #111111 100%);
      border: 1px solid #333333;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
    }
    h1 {
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      color: #a3a3a3;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(90deg, #684B9E 0%, #00BFDE 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2 style="color: #fff; margin:0 0 20px 0; font-size: 20px; text-transform: uppercase;">Aformix</h2>
      <h1>Confirm your subscription</h1>
      <p>Almost there! Please confirm your email address to join the Aformix Insider Network and start receiving premium insights.</p>
      <a href="${verifyUrl}" class="btn">Verify Email</a>
      <p style="margin-top: 30px; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  </div>
</body>
</html>
  `;
};
