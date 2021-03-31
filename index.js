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
const prefix2 = "The pokémon ";

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

client.on("message", async (message) => {
  if (message.embeds[0]) {
    for (let embed of message.embeds) {
      if (embed.title === "A wild pokémon has appeared!") {
        return message.channel.send(`.h`);
      } else return;
    }
  } else return;
});

client.on("message", (message) => {
  if (message.content === "That is the wrong pokémon!") {
    setTimeout(function () {
      return message.channel.send(".h");
    }, 10000);
  }
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix2)) return;
  if (
    message.author.id === "716390085896962058" &&
    (message.channel.id === "826377294519861275" ||
      message.channel.id === "826535927336796180")
  ) {
    const args = message.content.slice(prefix2.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "is") {
      client.commands.get("autocatcher").execute(message, args);
    }
  }
});

client.login(process.env.TOKEN2);
