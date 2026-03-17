const mineflayer = require('mineflayer');

// ===================== AYARLAR =====================
const config = {
  host: 'SUNUCU_ADI.aternos.me',   // Aternos sunucu adresi
  port: 25565,                      // Port (genellikle 25565)
  username: 'BotAdi',               // Bot kullanıcı adı (premium değilse herhangi bir ad)
  version: '1.20.1',                // Sunucu Minecraft versiyonu
  password: 'agf9301',              // AuthMe şifresi
  auth: 'offline',                  // Offline mod için 'offline', premium için 'microsoft'
};
// ===================================================

let registered = false;
let loggedIn = false;

function createBot() {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version,
    auth: config.auth,
  });

  // Sunucuya bağlanıldığında
  bot.once('spawn', () => {
    console.log('[BOT] Sunucuya bağlandı!');
    loggedIn = false;
    registered = false;
  });

  // Sohbet mesajlarını dinle
  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString();
    console.log('[SOHBET]', message);

    const msgLower = message.toLowerCase();

    // AuthMe: Kayıtlı değil → register
    if (
      msgLower.includes('/register') ||
      msgLower.includes('kayıt') && msgLower.includes('değil') ||
      msgLower.includes('register to play') ||
      msgLower.includes('please register') ||
      msgLower.includes('you are not registered') ||
      msgLower.includes('kayıtlı değilsiniz') ||
      msgLower.includes('kayıt olun')
    ) {
      if (!registered) {
        setTimeout(() => {
          bot.chat(`/register ${config.password} ${config.password}`);
          console.log('[BOT] /register komutu gönderildi.');
          registered = true;
        }, 1000);
      }
    }

    // AuthMe: Kayıtlı → login
    if (
      msgLower.includes('/login') ||
      msgLower.includes('please login') ||
      msgLower.includes('you are registered') ||
      msgLower.includes('giriş yapın') ||
      msgLower.includes('login to play') ||
      msgLower.includes('kayıtlısınız') ||
      msgLower.includes('oturum açın')
    ) {
      if (!loggedIn) {
        setTimeout(() => {
          bot.chat(`/login ${config.password}`);
          console.log('[BOT] /login komutu gönderildi.');
          loggedIn = true;
        }, 1000);
      }
    }

    // Texture pack sorusu → Hayır / Reddet
    if (
      msgLower.includes('texture') ||
      msgLower.includes('resource pack') ||
      msgLower.includes('kaynak paketi') ||
      msgLower.includes('texturepack')
    ) {
      console.log('[BOT] Texture pack sorusu algılandı, reddediliyor...');
      // Mineflayer otomatik olarak resource pack dialog'unu reddeder
      // Ancak ek olarak mesajla da reddedelim
    }
  });

  // Resource pack gönderildiğinde otomatik reddet
  bot.on('resource_pack_send', (url, hash) => {
    console.log('[BOT] Resource pack teklifi reddedildi:', url);
    bot.acceptResourcePack(false);
  });

  // Hata yönetimi
  bot.on('error', (err) => {
    console.error('[HATA]', err.message);
  });

  // Bağlantı kesildiğinde yeniden bağlan
  bot.on('end', (reason) => {
    console.log('[BOT] Bağlantı kesildi:', reason);
    console.log('[BOT] 5 saniye sonra yeniden bağlanılıyor...');
    setTimeout(createBot, 5000);
  });

  // Kick olunduğunda
  bot.on('kicked', (reason) => {
    console.log('[BOT] Kicklendi:', reason);
  });

  return bot;
}

createBot();
