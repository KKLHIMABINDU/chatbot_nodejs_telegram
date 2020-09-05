const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const token = "1245867656:AAH1hYk4sy_BeDe62M0umsWc5ztgzjL6Evw";
const bot = new TelegramBot(token, { polling: true });

const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const password = "webcap";

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log(msg.chat.first_name);
  const username = msg.text;
  function f(username, i) {
    nightmare
      .viewport(1440, 900)
      .goto("http://svecwecap.in/")
      .wait(10000)
      .type("#txtId2", username)
      .type("#txtPwd2", password)
      .click("#imgBtn2")
      .wait(10000)
      .click("#Table_01 > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2) > a")
      .goto("http://svecwecap.in/Academics/StudentAttendance.aspx?showtype=SA")
      .wait(5000)
      .check("#radTillNow")
      .click("#btnShow")
      .wait(10000)
      .screenshot("pics/ecap.png")
      .end()
      .then(console.log)
      .catch((error) => {
        console.error("Failed:", error);
      });
    setTimeout(i, 55000);
  }
  function i() {
    fs.readFile("pics/ecap.png", function (err, data) {
      if (err) {
        bot.sendMessage(msg.chat.id,"Network error")
        bot.sendPhoto(chatId, data);
        console.log(err);

      } else {
        bot.sendPhoto(chatId, data);
      }
    });
  }

  //passing i as a callback function to f.
  f(username, i);
});