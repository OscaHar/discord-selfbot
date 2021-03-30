module.exports = {
  name: "spam",
  description: "spammer",
  execute(message, args) {
    let loop = parseInt(args, 10);

    (function myLoop(i) {
      let delay = Math.random() * 5 + 0.25;

      let result = "";
      let characters = "abcdefghijklmnopqrstuvwxyz";
      let charactersLength = characters.length;

      let gibberish = Math.floor(Math.random() * 3) + 3;

      for (var j = 0; j < gibberish; j++)
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      setTimeout(function () {
        message.channel.send(`${result}, ${i}`); //  your code here
        if (--i) myLoop(i); //  decrement i and call myLoop again if i > 0
      }, delay * 1000);
    })(loop);
  },
};
