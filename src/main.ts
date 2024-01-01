import { Client, GatewayIntentBits } from "discord.js";
import { CommandModule } from "./types/type.js";
import { config } from "dotenv";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  if (!client.user) return;
  else {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  let module: CommandModule = {};
  try {
    module = await import("./commands/" + interaction.commandName);
  } catch (error) {
    console.log(error);
    await interaction.reply("There was internal error, please try again later");
    return;
  }

  const command = module[interaction.commandName];
  await command(interaction);
});

await client.login(process.env.TOKEN);
