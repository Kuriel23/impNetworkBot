const discord = require("discord.js");

module.exports = {
  name: "eightball",
  description: "Me faça perguntas!",
  options: [
    {
      name: "pergunta",
      description: "Qual pergunta?",
      type: 3,
      required: true,
    },
  ],
  categoria: "diversão",
  run: async (interaction, client) => {
    let pergunta = interaction.options.get("pergunta").value;
    if (
      pergunta.includes("suicídio") ||
      pergunta.includes("suicidio") ||
      pergunta.includes("Suicídio") ||
      pergunta.includes("Suicidio") ||
      pergunta.includes("tirar a vida") ||
      pergunta.includes("perder a vida") ||
      pergunta.includes("Perder a vida") ||
      pergunta.includes("Tirar a vida") ||
      pergunta.includes("suicidar") ||
      pergunta.includes("Suicidar") ||
      pergunta.includes("matar") ||
      pergunta.includes("Matar")
    )
      return interaction.reply({
        content:
          "Não faça essa ação! Se você pensa sobre tais atos contacte uma psicológa urgentemente para lhe consultar o mais rápido possível e recomendar alguns medicamentos, conselhos e entre outros!",
      });
    let respostas = [
      "Todos os sinais apontam que sim...",
      "Desculpa, mas não.",
      "Pode ter certeza!",
      "Tá zuando, né? COM CERTEZA Não, cara, não...",
      "Claro que sim!",
      "Muito provavelmente Acho que sim...",
      "Não me enche, cara!",
      "Sim, meu amor, claro que sim!",
      "Me deixa em paz...",
    ];

    let resultado = Math.floor(Math.random() * respostas.length);
    let aio = new discord.EmbedBuilder()
      .setAuthor({
        name: `» ${respostas[resultado]}`,
        iconURL: "https://i.imgur.com/Mp9cg1i.png",
      })
      .setColor(client.cor);
    return interaction.reply({ embeds: [aio] });
  },
};
