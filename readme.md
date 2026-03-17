# 🤖 Aternos Minecraft Bot

AuthMe destekli, resource pack reddeden Minecraft botu.

---

## 📁 Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `bot.js` | JavaScript (Mineflayer) versiyonu |
| `bot.py` | Python versiyonu |
| `package.json` | Node.js bağımlılıkları |

---

## ⚙️ KURULUM

### JavaScript (Önerilen)

```bash
# Node.js kurulu olmalı (https://nodejs.org)
npm install
node bot.js
```

### Python

```bash
# Python 3.8+ ve Node.js kurulu olmalı
pip install javascript
python bot.py
```

---

## 🔧 AYARLAR (bot.js veya bot.py içinde değiştirin)

```js
host: 'SUNUCU_ADI.aternos.me'   // ← Kendi sunucu adresin
port: 25565
username: 'BotAdi'               // ← Bot'un kullanıcı adı
version: '1.20.1'                // ← Sunucunun Minecraft versiyonu
password: 'agf9301'              // ← AuthMe şifresi
auth: 'offline'                  // Cracked sunucu için 'offline'
```

---

## ✅ Bot Ne Yapıyor?

1. **Sunucuya bağlanır**
2. **Sohbeti izler:**
   - "you are not registered" gibi mesaj gelirse → `/register agf9301 agf9301`
   - "please login" gibi mesaj gelirse → `/login agf9301`
3. **Resource pack teklifini otomatik reddeder**
4. **Bağlantı kesilirse 5 saniye sonra yeniden bağlanır**

---

## ⚠️ NOTLAR

- Sunucu **online mod** (premium) ise `auth: 'microsoft'` yapıp Microsoft hesabıyla giriş gerekir.
- Aternos sunucusu kapalıysa bot bağlanamaz, sunucuyu önce açman gerekir.
- `version` ayarını sunucunun Minecraft versiyonuyla eşleştir.
