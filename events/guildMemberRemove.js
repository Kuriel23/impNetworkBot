module.exports = async (client, member) => {
  const discord = require("discord.js");

  if (member.guild.id != "597137568605274112") return;
  if (member.user.bot) return;

  let MembroSaiuEmbed = new discord.EmbedBuilder()
    .setAuthor({
      name: `» Press F! Soldado Abatido: ${member.user.tag}\n Rest in Peace`,
      iconURL: "https://i.imgur.com/1hE4YLX.png"
    })
    .setImage("https://i.imgur.com/1zpT3Zs.jpeg")
    .setColor(client.cor);

  client.channels.cache.get("600300473848823809").send({ embeds: [MembroSaiuEmbed]});
};
