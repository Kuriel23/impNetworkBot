var discord,
  { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "addemoji",
  description: "Insira emojis!",
  options: [
    {
      name: "link",
      description: "Insira um link de emoji!",
      type: 3,
      required: true,
    },
    {
      name: "nome",
      description: "Coloque um nome no emoji!",
      type: 3,
      required: true,
    },
  ],
  category: "info",
  run: async (interaction, client) => {
    let link = interaction.options.get("link").value;
    let nome = interaction.options.get("nome").value;
    interaction.guild.emojis.create(link, nome);
    let emb = new discord.EmbedBuilder()
      .setAuthor({ name: "» Emoji criado com sucesso!", iconURL: link })
      .setColor(client.cor);
    return interaction.reply({ embeds: [emb] });
  },
};
