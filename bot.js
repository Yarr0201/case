import { Telegraf } from "telegraf";

const bot = new Telegraf("8021914593:AAG6tEXdV42eoMwd-xzGwVzXmSNYub8mi5A");

bot.start((ctx) => {
  ctx.reply("🎁 Привет! Хочешь открыть кейс?", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "🎮 Открыть мини-игру",
            web_app: {
              url: "https://sage-hummingbird-5ede18.netlify.app/"
            },
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.launch();
console.log("✅ Бот запущен!");
