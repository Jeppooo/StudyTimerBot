import { Bot, InlineKeyboard } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN!);

let todayMinutes = 0;
let weeklyMinutes = 0;

interface UserState {
  current: string;
  previous: string;
}
interface UserTimer {
  timeout: NodeJS.Timeout;
  type: "study" | "break";
}
const timers: Record<number, UserTimer> = {};


const userState: Record<number, string> = {};


const startMenu = `📚 <b>Benvenuto su StudyTimer Bot!</b>

Organizza il tuo tempo, resta concentrato e migliora la tua produttività con la tecnica <b>Pomodoro</b>! 🍅

<b>Come funziona?</b>
• Avvia una sessione di studio di 25 minuti con "Study"
• Fai una pausa di 5 minuti con "Break"
• Tieni traccia dei tuoi progressi con "Stats"
• Usa "Stop" per fermare un timer attivo
• Premi "Help" per una guida completa del bot

✨ Studia in modo intelligente, non solo di più!

Premi "Start" per cominciare
`;
const choiceMenu = `
📋 <b>Cosa vuoi fare?</b>

Scegli una delle opzioni qui sotto per iniziare la tua sessione di studio o gestire le pause e le statistiche. 💡
`;

const studyMenu = `

🎯 <b>Modalità Studio Attiva</b>

Scegli cosa fare:

• Avvia una sessione di studio (25 min)
• Fai una pausa breve (5 min)
• Consulta le tue statistiche giornaliere

<b>Pulsanti disponibili:</b>
"Break" – Inizia una pausa ☕
"Stop" – Ferma il timer ⏹
"Stats" – Visualizza i tuoi progressi 📊
`;

const breakMenu = `
☕ <b>Pausa iniziata!</b>

Hai guadagnato un momento di relax. Respira, alzati, fai stretching... oppure prendi un caffè. ☀️

⏱ Ti avviserò automaticamente tra 5 minuti per riprendere a studiare con la giusta energia!
<b>Pulsanti disponibili:</b>
"Study" – Torna allo studio 🧠
"Stop" – Ferma la pausa ⏹
"Stats" – Visualizza i tuoi progressi 📊
`;
const statsMenu = (todayMinutes: number, weeklyMinutes: number) => `
📊 <b>Le tue statistiche di studio</b>

🗓 <b>Oggi:</b> ${todayMinutes} minuti
📅 <b>Questa settimana:</b> ${weeklyMinutes} minuti

Continua così! Ogni sessione ti avvicina ai tuoi obiettivi. 🚀

<b>Comandi rapidi:</b>
"Study" – Nuova sessione
"Break" – Fai una pausa
"Stop" – Ferma il timer
`;
const stopMenu = `
⏹ <b>Timer interrotto</b>

Hai fermato il timer. Tutto ok! A volte prendersi una pausa è la scelta giusta. ✨

📌 Puoi riprendere in qualsiasi momento con:
"Study" – per ricominciare a studiare
"Break" – per fare una pausa breve
"Stats" – per controllare i tuoi progressi
`;

const helpMenu = `
❓ <b>Aiuto – Come usare StudyTimer Bot</b>

Questo bot ti aiuta a organizzare lo studio usando la tecnica <b>Pomodoro</b> (25 min studio + 5 min pausa).

<b>📌 Comandi principali:</b>
"Study" – Avvia una sessione di studio (25 min)
"Break" – Inizia una pausa breve (5 min)
"Stop" – Ferma un timer attivo
"Stats" – Visualizza le tue statistiche giornaliere

<b>🧠 Suggerimenti:</b>
• Mantieni il focus durante la sessione
• Usa le pause per rilassarti davvero
• Raccogli più sessioni per una giornata produttiva

✨ Studia con costanza. I piccoli passi fanno grandi risultati!
`;

const helpMenu1 = `
❓ <b>Aiuto – Come usare StudyTimer Bot</b>

Questo bot ti aiuta a organizzare lo studio usando la tecnica <b>Pomodoro</b> (25 min studio + 5 min pausa).

<b>📌 Comandi principali:</b>
"Study" – Avvia una sessione di studio (25 min)
"Break" – Inizia una pausa breve (5 min)
"Stop" – Ferma un timer attivo
"Stats" – Visualizza le tue statistiche giornaliere

<b>🧠 Suggerimenti:</b>
• Mantieni il focus durante la sessione
• Usa le pause per rilassarti davvero
• Raccogli più sessioni per una giornata produttiva

✨ Studia con costanza. I piccoli passi fanno grandi risultati!.
`;
const startButton = "Start";
const studyButton = "Study";
const breakButton = "Break";
const stopButton = "Stop";
const backButton = "Back";
const statsButton = "Stats";
const helpButton = "Help";
const helpButton1 = "help";
const ricominciaButton = "Ricomincia"

const startMenuMarkup = new InlineKeyboard()
  .text(startButton, startButton)
  .text(helpButton, helpButton);
const choiceMenuMarkup = new InlineKeyboard()
  .text(studyButton, studyButton)
  .text(statsButton, statsButton)
  .text(backButton, backButton)
  .text(helpButton1, helpButton1);
const studyMenuMarkup = new InlineKeyboard()
  .text(breakButton, breakButton)
  .text(stopButton, stopButton);
const breakMenuMarkup = new InlineKeyboard()
  .text(ricominciaButton, ricominciaButton)
  .text(stopButton, stopButton)
  .text(statsButton, statsButton);
const statsMenuMarkup = new InlineKeyboard()
  .text(studyButton, studyButton)
  .text(stopButton, stopButton)
  .text(backButton, backButton)
const stopMenuMarkup = new InlineKeyboard()
  .text(studyButton, studyButton)
  .text(breakButton, breakButton)
  .text(statsButton, statsButton);
const helpMenuMarkup = new InlineKeyboard()
  .text(studyButton)
  .text(backButton, backButton);
  const helpMenuMarkup1 = new InlineKeyboard()
  .text(studyButton)
  .text(backButton, backButton);

bot.command("start", async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return; // Safety check

  userState[userId] = startMenu;

  await ctx.reply(startMenu, {
    parse_mode: "HTML",
    reply_markup: startMenuMarkup,
  });
});

bot.on("message", async (ctx) => {
  console.log(
    `${ctx.from.username} ha scritto ${"text" in ctx.message ? ctx.message.text : ""
    }`
  );
});

bot.callbackQuery(startButton, async (ctx) => {
  userState[ctx.from.id] = choiceMenu;
  await ctx.editMessageText(choiceMenu, {
    parse_mode: "HTML",
    reply_markup: choiceMenuMarkup,
  });
});

bot.callbackQuery(helpButton, async (ctx) => {
  console.log( `
    ${ctx.from.username} ha premuto helpButton`

  )
  userState[ctx.from.id] = helpMenu;

  await ctx.editMessageText(helpMenu, {

    parse_mode: "HTML",
    reply_markup: helpMenuMarkup,
  });
});

bot.callbackQuery(helpButton1, async (ctx) => {
  console.log( `
    ${ctx.from.username} ha premuto helpButton1`

  )
  userState[ctx.from.id] = helpMenu1;

  await ctx.editMessageText(helpMenu1, {
    parse_mode: "HTML",
    reply_markup: helpMenuMarkup1,
  });
});

bot.callbackQuery(backButton, async (ctx) => {
  const last = userState[ctx.from.id];

  if (last === choiceMenu) {
    await ctx.editMessageText(startMenu, {
      parse_mode: "HTML",
      reply_markup: startMenuMarkup,
    });
  } else if (last === helpMenu) {
    await ctx.editMessageText(startMenu, {
      parse_mode: "HTML",
      reply_markup: startMenuMarkup,
    });
  } else if (last === helpMenu1) {
    await ctx.editMessageText(choiceMenu, {
      parse_mode: "HTML",
      reply_markup: choiceMenuMarkup
    })
  } else if (last === statsMenu(todayMinutes, weeklyMinutes)) {
    await ctx.editMessageText(choiceMenu, {
      parse_mode: "HTML",
      reply_markup: choiceMenuMarkup
    })
  }
});

bot.callbackQuery(studyButton, async (ctx) => {
  const userId = ctx.from.id;
  userState[userId] = studyMenu;
  await ctx.editMessageText(studyMenu, {
    reply_markup: studyMenuMarkup,
    parse_mode: "HTML",
  });
  await ctx.api.sendMessage(userId, "⏳ Studio iniziato! Ti avviserò tra 25 minuti.");

  // Cancella eventuale timer esistente per sicurezza
  if (timers[userId]) {
    clearTimeout(timers[userId].timeout);
  }

  timers[userId] = {
    timeout: setTimeout(() => {
      ctx.api.sendMessage(userId, "✅ Studio finito!");
      // Aggiorna statistiche
      todayMinutes += 25;
      weeklyMinutes += 25;
      delete timers[userId];
    }, 25 * 60 * 1000), // 25 minuti reali, per test usa 10 * 1000
    type: "study",
  };
});

 bot.callbackQuery(statsButton, async (ctx) => {
  const userId = ctx.from.id;
  userState[userId] = statsMenu(todayMinutes, weeklyMinutes)
  const message = statsMenu(todayMinutes, weeklyMinutes);
  await ctx.editMessageText(message, {
    reply_markup: statsMenuMarkup,
    parse_mode: "HTML"
  })
}) 


bot.callbackQuery(stopButton, async (ctx) => {
  const userId = ctx.from.id;

  const userTimer = timers[userId];
  if (userTimer) {
    clearTimeout(userTimer.timeout);
    delete timers[userId];
  }

  userState[userId] = stopMenu;

  let stopMessage = "⏹ <b>Timer interrotto</b>\n\nHai fermato il timer. Tutto ok!";

  if (userTimer?.type === "study") {
    stopMessage += " Hai interrotto la sessione di studio.";
  } else if (userTimer?.type === "break") {
    stopMessage += " Hai interrotto la pausa.";
  }

  stopMessage += "\n\n📌 Puoi riprendere in qualsiasi momento con:\n\"Study\" – per ricominciare a studiare\n\"Break\" – per fare una pausa breve\n\"Stats\" – per controllare i tuoi progressi";

  await ctx.editMessageText(stopMessage, {
    reply_markup: stopMenuMarkup,
    parse_mode: "HTML",
  });
});


bot.callbackQuery(breakButton, async (ctx) => {
  const userId = ctx.from.id;
  userState[userId] = breakMenu;
  await ctx.editMessageText(breakMenu, {
    reply_markup: breakMenuMarkup,
    parse_mode: "HTML",
  });

  if (timers[userId]) {
    clearTimeout(timers[userId].timeout);
  }

  timers[userId] = {
    timeout: setTimeout(async () => {
      try {
        await ctx.api.sendMessage(userId, "⏰ La pausa è finita! Torna a studiare con energia! 💪");
      } catch (error) {
        console.error("Errore durante l'invio del messaggio di fine pausa:", error);
      }
      delete timers[userId];
    }, 5 * 60 * 1000), // 5 minuti reali, per test usa 10 * 1000
    type: "break",
  };
});

bot.callbackQuery(stopButton, async (ctx) => {
  const userId = ctx.from.id;

  const userTimer = timers[userId];
  if (userTimer) {
    clearTimeout(userTimer.timeout);
    delete timers[userId];
  }

  userState[userId] = stopMenu;

  let stopMessage = `⏹ <b>Timer interrotto</b>\n\nHai fermato il timer. Tutto ok!`;

  if (userTimer?.type === "study") {
    stopMessage += ` Hai interrotto la sessione di studio.`;
  } else if (userTimer?.type === "break") {
    stopMessage += ` Hai interrotto la pausa.`;
  }

  stopMessage += `

📌 Puoi riprendere in qualsiasi momento con:
"Study" – per ricominciare a studiare
"Break" – per fare una pausa breve
"Stats" – per controllare i tuoi progressi`;

  await ctx.editMessageText(stopMessage, {
    reply_markup: stopMenuMarkup,
    parse_mode: "HTML",
  });
});

bot.start();
