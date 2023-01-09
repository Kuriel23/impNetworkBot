const discord = require("discord.js");

module.exports = {
  name: "embedativadores",
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
        name: "» Ativadores",
        iconURL: "https://i.imgur.com/BZLf96g.png",
      })
      .setDescription(
        `Ativadores servem para receber cargos de notificações ou acesso a algum contéudo.\n\nVocê pode clicar abaixo em algum dos botões para obter algum cargo.`
      )
      .setImage("https://i.imgur.com/p49hnDQ.png")
      .setColor(client.cor)
      .setFooter({
        text: "Esperemos que goste da sua experiência customizada!",
      });
      const ativadores = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setCustomId('anuncio')
					.setLabel('Notificar Notícias')
          .setEmoji("📰")
					.setStyle(1),
			)
      .addComponents(
				new discord.ButtonBuilder()
					.setCustomId('parceria')
					.setLabel('Notificar Parcerias')
          .setEmoji("🤝")
					.setStyle(1),
			)
      .addComponents(
				new discord.ButtonBuilder()
					.setCustomId('mudae')
					.setLabel('Acessar Mudae')
          .setEmoji("❤")
					.setStyle(1),
			)
      .addComponents(
				new discord.ButtonBuilder()
					.setCustomId('ian')
					.setLabel('Acessar IAN')
          .setEmoji("💬")
					.setStyle(1),
			)
    message.channel.send({ embeds: [embed], components: [ativadores] });
  },
};
