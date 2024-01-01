import { Interaction } from "discord.js";
import { config } from "dotenv";
import { getApod } from "../helpers/curlGet";
config();

export async function apod(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  const jsonData = await getApod(process.env.API_KEY ?? "");
  await interaction.reply(jsonData.title);
  const canDesc = interaction.options.getBoolean("description");
  if (canDesc) await interaction.channel?.send(jsonData.explanation);
  await interaction.channel?.send(jsonData.hdurl ?? "");
}
