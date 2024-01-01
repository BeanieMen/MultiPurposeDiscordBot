import { Interaction } from "discord.js";
import { getDB, setDB } from "../helpers/highdb";
import { getRandom } from "../helpers/wordle/compare";
import { words } from "../helpers/wordle/word";
import { compare } from "../helpers/wordle/compare";
import { buildEmbed } from "../helpers/discord/embedBuilder";

export async function wordle(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  const { user } = interaction;

  if (interaction.commandName === "wordle") {
    const type = interaction.options.getString("type");
    if (type == "start") {
      if (!interaction.isChatInputCommand()) return;
      const randomWord = getRandom(words);
      await setDB(user.username, 5, randomWord, []);
      await interaction.reply("Succesfully created game");
      return;
    } else if (type == "stop") {
      if (!interaction.isChatInputCommand()) return;
      await setDB(user.username, 5, "", []);
      await interaction.reply("Succesfully destroyed game");
      return;
    }
  }
  const messages = [
    "Please create a game first by doing `/wordle Start`",
    "Please provide a word first",
    "The word you have guessed should be exactly 5 characters in length",
  ];
  const data = await getDB(user.username);
  const word = interaction.options.getString("word");

  if (!data.word) {
    await interaction.reply(messages[0]);
    return;
  }
  if (!word) {
    await interaction.reply(messages[1]);
    return;
  }
  if (word.length !== 5) {
    await interaction.reply(messages[2]);
    return;
  }

  const correct = compare(word, data.word);
  if (correct.correct) {
    await interaction.reply("correct");
  } else {
    if (data.tries - 1 === 0) {
      await interaction.reply("You lost");
      await interaction.channel?.send(`The correct word was ${data.word}`);
    } else {
      await setDB(user.username, data.tries - 1, data.word, [...data.guesses, correct.result]);
      await interaction.reply(word);
    }

    const embed = await buildEmbed([...data.guesses, correct.result], data.tries - 1);
    await interaction.channel?.send({ embeds: [embed] });
  }
}
