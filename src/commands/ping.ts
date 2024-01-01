import { Interaction } from "discord.js";

export async function ping(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  await interaction.reply("PONG!");
}
