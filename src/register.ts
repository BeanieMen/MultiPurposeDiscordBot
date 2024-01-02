import { REST, Routes } from "discord.js";

import { commands } from "../commands";
import { config } from "dotenv";

config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN ?? "");

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands("703259121155309619"), { body: commands });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
