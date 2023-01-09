const discord = require("discord.js");
const wiki = require("wikipedia");

module.exports = {
  name: "wikipedia",
  description: "Pesquise algo dentro do Wikipédia!",
  options: [
    {
      name: "pesquisa",
      description: "Qual pesquisa deve ser efetuada?",
      type: 3,
      required: true,
    },
  ],
  category: "info",
  run: async (interaction, client) => {
    let pesquisa = interaction.options.get("pesquisa").value;
    try {
      const newUrl = await wiki.setLang("pt");
      const searchResults = await wiki.summary(pesquisa);
      let wikiEmbed = new discord.EmbedBuilder()
        .setAuthor({
          name: "» " + searchResults.titles.normalized,
          iconURL:
            "https://upload.wikimedia.org/wikipedia/commons/d/de/Wikipedia_Logo_1.0.png",
        })
        .setDescription(searchResults.extract)
        .setColor(client.cor)
        .setFooter({ text: searchResults.content_urls.desktop.page })
        .setTimestamp();
      return interaction.reply({ embeds: [wikiEmbed] });
    } catch (err) {
      let emb = new discord.EmbedBuilder()
        .setAuthor({
          name: "» Sem Resultados Encontrados.",
          iconURL: client.err,
        })
        .setColor(client.cor);
      return interaction.reply({ embeds: [emb] });
    }
  },
};
