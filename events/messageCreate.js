const superagent = require("superagent");
const translate = require("@vitalets/google-translate-api");

module.exports = async (client, message) => {
  const discord = require("discord.js");

  if (message.channel.id === "630152042194665493") {
    if (message.author.id === client.user.id) return;
    const attachment = new discord.AttachmentBuilder(
      "https://i.imgur.com/0qDm0YN.png",
      { name: "parceria.png" }
    );
    return message.channel.send({
      content: !message.author.bot ? "<@&926845797553807401>" : "",
      files: [attachment],
    });
  }

  if (message.channel.type === "news") {
    message.crosspost();
  }

  if (message.author.bot) return 0;

  if (message.channel.id === "1004061423476940851") {
    message.react("1004065409969958925");
    message.react("1004065368932896789");
  }

  client.emit("checkMessage", message);

  if (message.channel.id === "962803914208600124") {
    let convite =
      /((discord|invite)\.(gg|io|me|plus|link|io|gg|li)|discordapp\.com\/invite)\/.+/gi.test(
        message.content
      );
    if (convite === false) {
      message.delete();
      return message.channel
        .send({
          content: `Sua parceria foi automaticamente negada por não possuir um convite válido! Tente novamente com algo válido!`,
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 30000);
        });
    }
    const inviteCodeRegexResult =
      /((discord|invite)\.(gg|io|me|plus|5|io|gg)|discordapp\.com\/invite)\/?([a-zA-Z0-9-]{2,32})/gi.exec(
        message.content
      );
    const code = inviteCodeRegexResult && inviteCodeRegexResult[4];
    await client
      .fetchInvite(code)
      .then((invite) => {
        setTimeout(function () {
          message.delete();
        }, 5000);
        if (invite.memberCount < 50)
          return message.channel
            .send({
              content: `Sua parceria foi automaticamente negada por não possuir um número de membros superior ou igual ao solicitado nos requisitos! Tente novamente quando pegar a quantia.`,
            })
            .then((msg) => {
              setTimeout(() => msg.delete(), 30000);
            });

        if (invite._expiresTimestamp !== null)
          return message.channel
            .send({
              content: `Sua parceria foi automaticamente negada por não possuir um convite permanentemente! Tente novamente com algo permanentemente!`,
            })
            .then((msg) => {
              setTimeout(() => msg.delete(), 30000);
            });

        message.channel
        .send({
          content: "Seu pedido de parceria foi enviado para análise!",
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 120000);
        });

        const row = new discord.ActionRowBuilder()
          .addComponents(
            new discord.ButtonBuilder()
              .setCustomId("ap")
              .setEmoji("✅")
              .setStyle(3)
          )
          .addComponents(
            new discord.ButtonBuilder()
              .setCustomId("rp")
              .setEmoji("❎")
              .setStyle(4)
          );
        client.channels.cache.get("962798017726001203").send({
          content:
            "```" +
            message.content
              .replace(/(@here|@everyone)/g, "")
              .replace(/`+/g, "") +
            "\nRep: <@" +
            message.author.id +
            ">``` <@" +
            message.author.id +
            "> <@&928334170143490159>",
          components: [row],
        });
      })
      .catch((err) =>
        message.channel
          .send({
            content: `Sua parceria foi automaticamente negada por não possuir um convite válido! Tente novamente com algo válido!`,
          })
          .then((msg) => {
            setTimeout(() => msg.delete(), 30000);
          })
      );
  }

  if (
    message.channel.id === "600300473848823809" &&
    message.content.includes("parceria") &&
    !message.member.permissions.has("KickMembers")
  ) {
    message.reply({
      content:
        "Ooooooops! Recomendaria-te enviares o teu convite de parceria em <#962803914208600124> e nossa equipe analisará assim que puder!",
    });
  }

  // [ - O BOT REPETE ]

  if (
    message.content.startsWith("boa tarde") ||
    message.content.startsWith("Boa tarde")
  ) {
    message.reply({ content: "Boa tarde" });
  }

  if (
    message.content.startsWith("boa noite") ||
    message.content.startsWith("Boa noite")
  ) {
    message.reply({ content: "Boa noite" });
  }

  if (
    message.content.startsWith("Bom dia") ||
    message.content.startsWith("bom dia")
  ) {
    message.reply({ content: "Bom dia" });
  }

  if (message.channel.id === "981668337127927848") {
    await translate(message.content, { to: "en" }).then(async (tapi) => {
      const { body } = await superagent
        .get(
          `https://api.udit.tk/api/chatbot?message=${encodeURIComponent(
            tapi.text
          )}&gender=male&name=Império%20Network`
        )
        .catch((e) => {
          0;
        });
      await translate(body.message, { to: "pt" }).then((rev) => {
        message.reply({ content: rev.text.replace(" -", "-") });
      });
    });
  }

  let prefix = "i?";

  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type === "dm"
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmda = args.shift().toLowerCase();
  let command =
    client.commands.get(cmda) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmda));
  if (!command) return;

  try {
    command.run(client, message, args);
  } catch (error) {
    message.reply({ content: `Houve um erro ao executar esse comando!` });
  }
};
