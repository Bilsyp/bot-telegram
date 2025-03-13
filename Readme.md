**Laporan Setup Bot Telegram**

## **1. Pembuatan Bot Telegram**
### **Langkah-langkah:**
1. **Buka BotFather di Telegram**
   - Cari `@BotFather`
   - Ketik `/newbot` dan ikuti instruksi
   - Simpan **TOKEN** yang diberikan oleh BotFather

2. **Uji Token Bot**
   ```bash
   curl -X GET "https://api.telegram.org/botTOKEN_BOT/getMe"
   ```
   - Jika berhasil, akan muncul informasi bot

---

## **2. Setup Webhook untuk Bot**
### **Langkah-langkah:**
1. **Jalankan Server Webhook (Express.js contoh)**
   ```javascript
   const express = require("express");
   const app = express();
   app.use(express.json());
   
   app.post("/webhook", (req, res) => {
       console.log(req.body);
       res.send("OK");
   });
   
   app.listen(8080, () => console.log("Server berjalan di port 8080"));
   ```

2. **Gunakan Ngrok untuk expose localhost**
   ```bash
   ngrok http 8080
   ```
   - Salin URL forwarding yang diberikan ngrok

3. **Set Webhook ke Telegram**
   ```bash
   curl -X GET "https://api.telegram.org/botTOKEN_BOT/setWebhook" -d "url=NGROK_URL/webhook"
   ```
   - Pastikan URL diubah sesuai dengan URL ngrok

---

## **3. Kirim Pesan ke Channel Telegram**
### **Langkah-langkah:**
1. **Dapatkan `chat_id` Channel**
   - Tambahkan bot ke channel sebagai admin
   - Jalankan perintah:
     ```bash
     curl -X GET "https://api.telegram.org/botTOKEN_BOT/getUpdates"
     ```
   - Kirim pesan ke channel, lalu jalankan ulang perintah di atas untuk mendapatkan `chat_id`

2. **Kirim Pesan ke Channel**
   ```bash
   curl -X POST "https://api.telegram.org/botTOKEN_BOT/sendMessage" \
   -d "chat_id=-100XXXXXXXXX" \
   -d "text=Halo, ini pesan dari bot!"
   ```

3. **Kirim Gambar ke Channel**
   ```bash
   curl -X POST "https://api.telegram.org/botTOKEN_BOT/sendPhoto" \
   -d "chat_id=-100XXXXXXXXX" \
   -d "photo=https://example.com/image.jpg" \
   -d "caption=Ini gambar dari bot!"
   ```

---

## **4. Deployment ke VPS**
### **Langkah-langkah:**
1. **Setup Node.js di VPS**
   ```bash
   sudo apt update && sudo apt install nodejs npm
   ```
2. **Clone atau Upload Project ke VPS**
   ```bash
   git clone https://github.com/username/bot-repo.git
   cd bot-repo
   npm install
   ```
3. **Jalankan Bot dengan PM2 (agar tetap berjalan di background)**
   ```bash
   npm install -g pm2
   pm2 start index.js --name bot-telegram
   pm2 save
   pm2 startup
   ```

---

## **Kesimpulan**
- Bot Telegram berhasil dibuat dan dihubungkan ke webhook
- Pesan dapat dikirim ke channel
- Bot sudah bisa dideploy ke VPS dengan PM2 untuk memastikan tetap berjalan

### **Next Step**
- Menambahkan fitur seperti command handling dan database
- Membuat auto-post dari sumber eksternal (RSS, API, dll.)

---

🔥 **DONE!** 🚀

