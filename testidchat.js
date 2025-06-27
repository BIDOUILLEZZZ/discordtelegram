const TelegramBot = require('node-telegram-bot-api');
const token = '7265904066:AAHlIDk01Uz792E77WT5QABO-16Q3fJyDPA';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  console.log('Chat ID:', msg.chat.id);
  console.log('Message reçu:', msg.text);
  // Tu peux arrêter le bot après avoir reçu le chat id
  process.exit();
});
