module.exports = {
  name: "ping",
  description: "this is a ping/test commands",
  execute(message, args) {
    message.channel.send("pong");
  },
};
