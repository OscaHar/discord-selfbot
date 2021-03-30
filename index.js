const discord = require("discord.js");
const fs = require("fs");
const cli = require("cli-color");
const consoleTitle = require("node-bash-title");
const dotenv = require("dotenv");
dotenv.config();

const client = new discord.Client({ disableEveryone: true });
consoleTitle("Discord selfbot");

client.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

const prefix = "µ-";

client.once("ready", async () => {
  console.log(cli.green(`Logged in as ${client.user.username}!`));
  setTimeout(() => {
    console.clear();
    console.log(cli.green("Ready to go"));
  }, 2000);
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  } else if (command === "spam") {
    client.commands.get("spam").execute(message, args);
  }
});

client.login(process.env.TOKEN);
