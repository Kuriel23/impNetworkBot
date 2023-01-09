const discord = require("discord.js");
const moment = require("moment");

moment.locale("pt-BR");
module.exports = {
  name: "perfil",
  description: "Veja informações de um usuário",
  options: [
    {
      name: "usuário",
      description: "Qual usuário deverá ser abraçado",
      type: 6,
    },
  ],
  category: "info",
  run: async (interaction, client) => {
    let user = interaction.options.getMember("usuário") || interaction.member;

    const userDB = await client.db.Users.findOne({ _id: user.user.id });
    try {
      const userDBnovo = await client.db.Users.findOne({ _id: user.user.id });
    } catch (err) {
      new client.db.Users({ _id: user.user.id }).save();
      return interaction.reply({
        content: "Você agora está registrado no nosso banco de dados!",
      });
    }
    let PrimeirasEmbed = new discord.EmbedBuilder()
      .setAuthor({
        name: "Perfil de: " + user.displayName,
        iconURL: "https://i.imgur.com/X49QykE.png",
      })
      .addFields([
        {
          name: "Discord Tag:",
          value: `${user.displayName}#${user.user.discriminator}`,
          inline: true,
        },
        {
          name: "Discord ID:",
          value: user.user.id,
          inline: true,
        },
        {
          name: "Conta criada em:",
          value: discord.time(user.user.createdAt, "f"),
          inline: true,
        },
        {
          name: "Conta entrou a:",
          value: discord.time(user.joinedAt, "f"),
          inline: true,
        },
      ])
      .setThumbnail(user.user.displayAvatarURL({ format: "jpg" }))
      .setColor(client.cor);
    interaction.reply({ embeds: [PrimeirasEmbed] });
  },
};
