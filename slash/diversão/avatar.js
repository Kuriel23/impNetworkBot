const discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Obtenha o avatar de um usuário",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
    },
    {
      name: "server_avatar",
      description: "Avatar do servidor?",
      type: 5,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    const member =
      interaction.options.getMember("usuário") || interaction.member;
    const isMemberAvatar = interaction.options.getBoolean("server_avatar");
    if (isMemberAvatar) {
      if (!member.avatar) {
        return interaction.reply({
          content: "Este usuário não tem avatar diferente no servidor",
          ephemeral: true,
        });
      }
      const row = new discord.ActionRowBuilder().addComponents(
        new discord.ButtonBuilder()
          .setEmoji("🖼️")
          .setURL(member.avatarURL({ dynamic: true, size: 4096 }))
          .setStyle(5)
      );
      const embed = new discord.EmbedBuilder()
        .setAuthor({
          name: member.user.tag,
          iconURL: member.avatarURL({ dynamic: true }),
        })
        .setImage(member.avatarURL({ dynamic: true, size: 4096 }))
        .setColor(client.cor);
      return interaction.reply({ embeds: [embed], components: [row] });
    }
    const row = new discord.ActionRowBuilder().addComponents(
        new discord.ButtonBuilder()
          .setEmoji("🖼️")
          .setURL(member.user.displayAvatarURL({ dynamic: true, size: 4096, format: "png"}))
          .setStyle(5)
      );
    const embed = new discord.EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setColor(client.cor);
    interaction.reply({ embeds: [embed], components: [row] });
  },
};
