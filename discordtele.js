require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');

// Variables d'environnement
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Vérification des variables
if (!DISCORD_TOKEN || !TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error("❌ Vérifie ton fichier .env : une ou plusieurs variables sont manquantes.");
  process.exit(1);
}

// Liste des channels Discord à surveiller (ID)
const ALLOWED_CHANNELS = [
  '1387370234645844068', // ← Remplace par l’ID de ton channel Discord
];

// Initialisation des clients
const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

// Quand le bot Discord est prêt
discordClient.once('ready', () => {
  console.log(`✅ Discord connecté en tant que ${discordClient.user.tag}`);
});

// Quand un message est posté sur Discord
discordClient.on('messageCreate', async (message) => {
  // Autorise les webhooks, ignore les bots "normaux"
  if (message.webhookId === null && message.author.bot) return;

  if (!ALLOWED_CHANNELS.includes(message.channel.id)) return;

  const username = message.author.username || 'Webhook';
  const content = message.content;

  const text = `💬 [${username}] dans #${message.channel.name} :\n${content}`;

  try {
    await telegramBot.sendMessage(TELEGRAM_CHAT_ID, text);
    console.log('Message Telegram envoyé :', content);
  } catch (error) {
    console.error('Erreur Telegram :', error);
  }
});

// Connexion à Discord
discordClient.login(DISCORD_TOKEN);
