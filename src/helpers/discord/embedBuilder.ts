import { EmbedBuilder } from "discord.js";

export async function buildEmbed(guesses: string[], tries: number) {
  const embed = new EmbedBuilder()
    .setTitle("Wordle")
    .setDescription(null)
    .setColor(0x00ffff)
    .addFields({ name: `Tries left: ${tries}`, value: "\u200B" });
  for (let i = 0; i < guesses.length; i++) {
    embed.addFields({ name: guesses[i], value: "\u200B" });
  }
  return embed;
}
