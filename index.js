const express = require('express');
const useragent = require('useragent');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace these with your actual store URLs
const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.google.android.youtube&hl=en';
const IOS_APP_URL = 'https://apps.apple.com/th/app/youtube/id544007664?l=th';

app.get('/', (req, res) => {
    const agent = useragent.parse(req.headers['user-agent']);

    if (agent.os.family.toLowerCase().includes('android')) {
        return res.redirect(ANDROID_APP_URL);
    } else if (agent.os.family.toLowerCase().includes('ios') || agent.device.family === 'iPhone' || agent.device.family === 'iPad') {
        return res.redirect(IOS_APP_URL);
    } else {
        // Serve a nice fallback HTML page
        return res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Open on Your Phone</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.05"/><circle cx="10" cy="50" r="0.5" fill="white" opacity="0.05"/><circle cx="90" cy="30" r="0.5" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      pointer-events: none;
    }
    
    .container {
      position: relative;
      z-index: 1;
      max-width: 450px;
      width: 100%;
    }
    
    .card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 40px 30px;
      border-radius: 24px;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset;
      text-align: center;
      transform: translateY(0);
      transition: all 0.3s ease;
      animation: slideUp 0.6s ease-out;
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 
        0 30px 60px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    }
    
    .language-switcher {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 30px;
      position: relative;
      z-index: 10;
    }
    
    .lang-btn {
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(102, 126, 234, 0.3);
      color: #4a5568;
      padding: 10px 16px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      font-weight: 600;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      min-width: 60px;
    }
    
    .lang-btn:hover {
      background: rgba(255, 255, 255, 1);
      border-color: rgba(102, 126, 234, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    
    .lang-btn.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-color: transparent;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      transform: translateY(-1px);
    }
    
    .icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 30px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .icon::before {
      content: '📱';
      font-size: 36px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }
    
    h1 {
      color: #2d3748;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }
    
    .subtitle {
      color: #4a5568;
      font-size: 16px;
      margin-bottom: 24px;
      line-height: 1.5;
      font-weight: 400;
    }
    
    .instruction {
      background: linear-gradient(135deg, #e6fffa, #f0fff4);
      border: 1px solid #81e6d9;
      border-radius: 16px;
      padding: 20px;
      margin: 24px 0;
      color: #2d3748;
    }
    
    .instruction-title {
      font-weight: 600;
      margin-bottom: 8px;
      color: #2c7a7b;
    }
    
    .qr-icon {
      display: inline-block;
      margin: 0 8px;
      font-size: 20px;
      vertical-align: middle;
    }
    
    .note {
      font-size: 14px;
      color: #718096;
      margin-top: 20px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 12px;
      border-left: 4px solid #667eea;
    }
    
    .floating-elements {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }
    
    .floating-element {
      position: absolute;
      width: 6px;
      height: 6px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }
    
    .floating-element:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
    .floating-element:nth-child(2) { top: 60%; left: 85%; animation-delay: 2s; }
    .floating-element:nth-child(3) { top: 80%; left: 20%; animation-delay: 4s; }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
      @media (max-width: 480px) {
      .card {
        padding: 30px 20px;
        margin: 10px;
      }
      
      h1 {
        font-size: 24px;
      }
      
      .subtitle {
        font-size: 15px;
      }
      
      .language-switcher {
        margin-bottom: 20px;
        gap: 8px;
      }
      
      .lang-btn {
        padding: 8px 12px;
        font-size: 13px;
        min-width: 50px;
      }
    }
  </style>
</head>
<body>
  <div class="floating-elements">
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
  </div>
  
  <div class="container">
    <div class="language-switcher">
      <button class="lang-btn active" onclick="setLanguage('en')">EN</button>
      <button class="lang-btn" onclick="setLanguage('lo')">ລາວ</button>
      <button class="lang-btn" onclick="setLanguage('th')">ไทย</button>
    </div>
    
    <div class="card">
      <div class="icon"></div>
      
      <h1 id="title">Scan on Your Phone</h1>
      <p class="subtitle" id="subtitle">This link is intended to be opened on a mobile device.</p>
      
      <div class="instruction">
        <div class="instruction-title" id="instruction-title">How to access:</div>
        <div id="instruction-text">
          Scan the QR code <span class="qr-icon">📱</span> using your smartphone camera or QR code reader app
        </div>
      </div>
      
      <div class="note" id="note">
        💡 If you're viewing this on a computer, use your phone to scan the QR code for the best mobile experience.
      </div>
    </div>
  </div>

  <script>
    const translations = {
      en: {
        title: "Scan on Your Phone",
        subtitle: "This link is intended to be opened on a mobile device.",
        instructionTitle: "How to access:",
        instructionText: "Scan the QR code 📱 using your smartphone camera or QR code reader app",
        note: "💡 If you're viewing this on a computer, use your phone to scan the QR code for the best mobile experience."
      },
      lo: {
        title: "ສະແກນດ້ວຍໂທລະສັບ",
        subtitle: "ລິ້ງນີ້ແມ່ນສຳລັບເປີດໃນອຸປະກອນມືຖື",
        instructionTitle: "ວິທີການເຂົ້າໃຊ້:",
        instructionText: "ສະແກນ QR code 📱 ດ້ວຍກ້ອງຖ່າຍຮູບຂອງສະມາດໂຟນ ຫຼື ແອັບອ່ານ QR code",
        note: "💡 ຖ້າທ່ານກຳລັງເບິ່ງສິ່ງນີ້ຢູ່ໃນຄອມພິວເຕີ, ໃຫ້ໃຊ້ໂທລະສັບຂອງທ່ານເພື່ອສະແກນ QR code ສຳລັບປະສົບການມືຖືທີ່ດີທີ່ສຸດ"
      },
      th: {
        title: "สแกนด้วยโทรศัพท์",
        subtitle: "ลิงก์นี้ใช้สำหรับเปิดในอุปกรณ์มือถือ",
        instructionTitle: "วิธีการเข้าใช้:",
        instructionText: "สแกน QR code 📱 ด้วยกล้องถ่ายรูปของสมาร์ทโฟน หรือแอป QR code reader",
        note: "💡 หากคุณกำลังดูสิ่งนี้ในคอมพิวเตอร์ ให้ใช้โทรศัพท์ของคุณสแกน QR code เพื่อประสบการณ์มือถือที่ดีที่สุด"
      }
    };

    function setLanguage(lang) {
      // Update active button
      document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      // Update content
      const translation = translations[lang];
      document.getElementById('title').textContent = translation.title;
      document.getElementById('subtitle').textContent = translation.subtitle;
      document.getElementById('instruction-title').textContent = translation.instructionTitle;
      document.getElementById('instruction-text').innerHTML = translation.instructionText;
      document.getElementById('note').textContent = translation.note;
      
      // Update HTML lang attribute
      document.documentElement.lang = lang;
      
      // Add a subtle animation when language changes
      document.querySelector('.card').style.transform = 'scale(0.98)';
      setTimeout(() => {
        document.querySelector('.card').style.transform = 'scale(1)';
      }, 100);
    }

    // Add some interactive effects
    document.addEventListener('DOMContentLoaded', function() {
      // Add hover effect to the icon
      const icon = document.querySelector('.icon');
      icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  </script>
</body>
</html>
      `);
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
