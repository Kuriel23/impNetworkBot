module.exports = async (client) => {
  let activities = [
    `imperionetwork.ml`,
    `www.imperionetwork.ml`,
    `Soul Hackers 2`,
    `Marvel's Spider-Man: Miles Morales`,
    `Grand Theft Auto VI`
	],
		i = 0;
  setInterval(() => {
    client.user.setPresence({
      activities: [{ name: activities[i++ % activities.length] }],
    })
  }, 15000);
  client.logger.log(`> ✅ • Carregado com sucesso [DISCORD]`, "success")
};
