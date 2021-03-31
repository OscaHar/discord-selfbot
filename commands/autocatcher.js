const pokemon = require("pokemon");
const stringSimilarity = require("string-similarity");

module.exports = {
  name: "autocatcher",
  description: "catches PKMN for you",
  execute(message, args) {
    let spawnedPkmn = args.toString();
    var matches = stringSimilarity.findBestMatch(spawnedPkmn, pokemon.all());
    message.channel.send(`.c ${matches.bestMatch.target}`);
    console.log(matches.bestMatchIndex);
  },
};
