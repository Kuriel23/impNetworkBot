const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  intents: 3276799,
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  cacheWithLimits: {
    MessageManager: {
      sweepInterval: 300,
      sweepFilter: discord.Sweepers.filterByLifetime({
        lifetime: 60,
        getComparisonTimestamp: (m) => m.editedTimestamp ?? m.createdTimestamp,
      }),
    },
  },
});

client.canais = JSON.parse(process.env.canais);
client.logger = require("./Utils/logger");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.slash = new discord.Collection();
client.db = require("./database.js");
client.cor = "#D62F2F";
client.ok = "https://i.imgur.com/01u54sR.png";
client.warn = "https://i.imgur.com/8gktqyJ.png";
client.err = "https://i.imgur.com/NGy07fZ.png";
client.catToken = process.env.catToken;
client.request = new (require("rss-parser"))();

require(`./handlers/commands`)(client);
require(`./handlers/events`)(client);
require(`./handlers/slash`)(client);
require("./slash");

setInterval(async () => {
  const doc = await client.db.News.findOne({ _id: "1" });
  client.request.parseURL(`https://imperionetwork.ml/feed`).then((data) => {
    if (doc.newsdata.includes(data.items[0].link)) return 0;
    const scrape = require("metadata-parser");
    scrape(data.items[0].link).then(function (metadata) {
      let img = metadata.openGraph.image.url;
      let emb = new discord.EmbedBuilder()
        .setAuthor({
          name: " » Clique aqui para ler",
          iconURL:
            "https://imperionetwork.ml/wp-content/uploads/2021/12/wp-min.png",
          url: data.items[0].link,
        })
        .setTitle("📰 " + data.items[0].title)
        .setImage(img)
        .setColor(client.cor);
      let button = new discord.ButtonBuilder()
        .setStyle(5)
        .setLabel("Ler notícia")
        .setEmoji("📰")
        .setURL(data.items[0].link);
      let row = new discord.ActionRowBuilder().addComponents(button);
      client.channels.cache
        .get(client.canais.animes)
        .send({
          content: "<@&727270078789189652>",
          embeds: [emb],
          components: [row],
        });
      doc.newsdata = data.items[0].link;
      doc.save();
    });
  });
}, 60000);

client.on("error", (error) => client.logger.log(error, "error"));
client.on("warn", (info) => client.logger.log(info, "warn"));
process.on("unhandledRejection", (error) =>
  client.logger.log("UNHANDLED_REJECTION\n" + error, "error")
);
process.on("uncaughtException", (error) => {
  client.logger.log("UNCAUGHT_EXCEPTION\n" + error, "error");
  client.logger.log("Uncaught Exception foi detectado, reiniciando...", "info");
  process.exit(1);
});

client.login(process.env.token).catch(() => {
  client.logger.log("Token Inválido!", "warn");
});
