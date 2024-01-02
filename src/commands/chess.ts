import { fenToJpeg } from "../helpers/chess/fenToJpeg";
import { config } from "dotenv";
import { getPuzzle } from "../helpers/curlGet";
import { AttachmentBuilder, Interaction } from "discord.js";
import { pgnToFen } from "../helpers/chess/pgnToFen";
config();

const puzzle = await getPuzzle(process.env.LICHESS ?? "");
const pgnStr = puzzle.game.pgn + " 1-0";

const answer = puzzle.puzzle.solution.join(" ");

export async function chess(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  const guess = interaction.options.getString("guess");
  if (guess) {
    if (guess === answer) {
      await interaction.reply("You got it right");
    } else {
      await interaction.reply("Wrong, Try again if you want loser");
    }
  } else {
    const fenStr = await pgnToFen(pgnStr);
    const image = await fenToJpeg(fenStr);
    const attachment = new AttachmentBuilder(image);
    await interaction.reply({ files: [attachment] });
  }
}
