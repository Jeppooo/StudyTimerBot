import {Bot, InlineKeyboard} from 'grammy';
import dotenv from 'dotenv';

const bot = new Bot(process.env.BOT_TOKEN!);

let todayMinutes = 0;
let weeklyMinutes = 0;

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
`
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
`

const breakMenu = `
☕ <b>Pausa iniziata!</b>

Hai guadagnato un momento di relax. Respira, alzati, fai stretching... oppure prendi un caffè. ☀️

⏱ Ti avviserò automaticamente tra 5 minuti per riprendere a studiare con la giusta energia!
<b>Pulsanti disponibili:</b>
"Study" – Torna allo studio 🧠
"Stop" – Ferma la pausa ⏹
"Stats" – Visualizza i tuoi progressi 📊
`
const statsMenu = (todayMinutes: number, weeklyMinutes: number) => `
📊 <b>Le tue statistiche di studio</b>

🗓 <b>Oggi:</b> ${todayMinutes} minuti
📅 <b>Questa settimana:</b> ${weeklyMinutes} minuti

Continua così! Ogni sessione ti avvicina ai tuoi obiettivi. 🚀

<b>Comandi rapidi:</b>
"Study" – Nuova sessione
"Break" – Fai una pausa
"Stop" – Ferma il timer
`
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
const startButton = "Start"
const studyButton = "Study"
const breakButton = "Break"
const stopButton = "Stop"
const backButton = "Back"
const statsButton = "Stats"
const helpButton = "Help"

const startMenuMarkup = new InlineKeyboard().text(startButton, startButton).text(helpButton, helpButton)
const choiceMenuMarkup = new InlineKeyboard().text(studyButton, studyButton).text(statsButton, statsButton).text(backButton, backButton).text(helpButton)
const studyMenuMarkup = new InlineKeyboard().text(breakButton, breakButton).text(stopButton, stopButton)
const breakMenuMarkup = new InlineKeyboard().text(studyButton, studyButton).text(stopButton, stopButton).text(statsButton, statsButton)
const statsMenuMarkup = new InlineKeyboard().text(studyButton, studyButton).text(stopButton, stopButton)
const stopMenuMarkup = new InlineKeyboard().text(studyButton, studyButton).text(breakButton, breakButton).text(statsButton, statsButton)
const helpMenuMarkup = new InlineKeyboard().text(studyButton).text(breakButton, breakButton).text(stopButton, stopButton).text(statsButton, statsButton)


bot.command("start", async (ctx) => {
    await ctx.reply(startMenu), {
        parse_mode: "HTML",
        reply_markup: startMenu,
    }
})

bot.on("message", async(ctx) => {
    console.log(
        `${ctx.from.username} ha scritto ${"text" in ctx.message ? ctx.message.text : ""}`
    )
})
bot.start();


