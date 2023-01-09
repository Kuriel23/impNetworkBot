const discord = require("discord.js");

module.exports = {
  name: "embeddiv",
  description: "",
  aliases: [],
  run: async (client, message, res) => {
    message.delete();
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.reply({
        content:
          "Você não é um Staff Gamer, tente novamente quando for um Staff qualificado!",
      });

    let embed = new discord.EmbedBuilder()
      .setAuthor({
        name: "» Divulgação",
        iconURL: "https://i.imgur.com/hSoFzvD.png",
      })
      .setDescription(
        `Divulgue o seu servidor, projeto ou outras coisas aqui.\n\nEste canal é livre para divulgação de qualquer coisa desde que não seja um vírus, scam ou entre outros.`
      )
      .setImage("https://i.imgur.com/gk1QBl3.jpeg")
      .setColor(client.cor);
    message.channel.send({ embeds: [embed] });
  },
};
