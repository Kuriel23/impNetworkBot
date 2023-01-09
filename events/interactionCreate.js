const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    if (!client.slash.has(interaction.commandName)) return;
    if (!interaction.guild) return;
    const command = client.slash.get(interaction.commandName);
    try {
      if (command.permissions) {
        if (!interaction.member.permissions.has(command.permissions)) {
          const embed = new EmbedBuilder()
            .setTitle("Falta de permissão")
            .setDescription(
              `:x: Você precisa de \`${command.permissions}\` para usar este comando`
            )
            .setColor(client.cor)
            .setTimestamp();
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
      if (command.devs) {
        if ("354233941550694400" === interaction.user.id) {
          return interaction.reply({
            content: "Nananinanão! Apenas desenvolvedores podem acessar isto!",
            ephemeral: true,
          });
        }
      }
      command.run(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "Ocorreu um estranho erro no meu terminal para este comando...",
        ephemeral: true,
      });
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId === "anuncio") {
      let role = interaction.guild.roles.cache.get("727270078789189652");
      let member = interaction.member;
      let msg = "";
      if (member.roles.cache.has(role.id)) {
        msg = "Remover cargo";
        member.roles.remove(role);
      } else {
        msg = "Adicionar cargo";
        member.roles.add(role);
      }
      interaction.reply({
        content: 'Operação "' + msg + '" realizada com sucesso.',
        ephemeral: true,
      });
    }
    if (interaction.customId === "parceria") {
      let role = interaction.guild.roles.cache.get("926845797553807401");
      let member = interaction.member;
      let msg = "";
      if (member.roles.cache.has(role.id)) {
        msg = "Remover cargo";
        member.roles.remove(role);
      } else {
        msg = "Adicionar cargo";
        member.roles.add(role);
      }
      interaction.reply({
        content: 'Operação "' + msg + '" realizada com sucesso.',
        ephemeral: true,
      });
    }
    if (interaction.customId === "mudae") {
      let role = interaction.guild.roles.cache.get("719499556265394206");
      let member = interaction.member;
      let msg = "";
      if (member.roles.cache.has(role.id)) {
        msg = "Remover cargo";
        member.roles.remove(role);
      } else {
        msg = "Adicionar cargo";
        member.roles.add(role);
      }
      interaction.reply({
        content: 'Operação "' + msg + '" realizada com sucesso.',
        ephemeral: true,
      });
    }
    if (interaction.customId === "ian") {
      let role = interaction.guild.roles.cache.get("981668119758114906");
      let member = interaction.member;
      let msg = "";
      if (member.roles.cache.has(role.id)) {
        msg = "Remover cargo";
        member.roles.remove(role);
      } else {
        msg = "Adicionar cargo";
        member.roles.add(role);
      }
      interaction.reply({
        content: 'Operação "' + msg + '" realizada com sucesso.',
        ephemeral: true,
      });
    }
    if (interaction.customId === "ap"){
      interaction.reply({
        content: `Esta parceria foi aceite por <@${interaction.member.id}>!`,
      });
      client.channels.cache.get("630152042194665493").send(interaction.message.content.replace(/`+/g, "").replace("<@&928334170143490159>")+"\n<@&926845797553807401>")
    }
      
    if (interaction.customId === "rp"){
      interaction.reply({
        content: `Esta parceria foi negada por <@${interaction.member.id}>!`,
      });
      interaction.message.delete();}
  }
};
