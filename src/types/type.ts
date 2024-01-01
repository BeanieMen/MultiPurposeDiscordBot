import { Interaction } from "discord.js";

import { Static, Type } from "@sinclair/typebox";

export type DB = {
  [name: string]: {
    word: string;
    tries: number;
    guesses: string[];
  };
};

export type CommandModule = {
  [name: string]: (interaction: Interaction) => Promise<void>;
};
const CommandChoice = Type.Object({
  name: Type.String(),
  value: Type.String(),
});

// Define the options type for command options
const CommandOption = Type.Object({
  name: Type.String(),
  description: Type.String(),
  type: Type.Union([Type.Literal(1), Type.Literal(2), Type.Literal(3), Type.Literal(4), Type.Literal(5), Type.Literal(6), Type.Literal(7), Type.Literal(8)]), // Adjust types based on your needs
  required: Type.Optional(Type.Boolean()),
  choices: Type.Optional(Type.Array(CommandChoice)),
});

// Define the command type
export const DiscordCommand = Type.Array(
  Type.Object({
    name: Type.String(),
    description: Type.String(),
    options: Type.Optional(Type.Array(CommandOption)),
  })
);
export type DiscordCommand = Static<typeof DiscordCommand>;

const responseApod = Type.Object({
  date: Type.String(),
  explanation: Type.String(),
  hdurl: Type.String(),
  url: Type.String(),
  media_type: Type.String(),
  service_version: Type.Literal("v1"),
  title: Type.String(),
});

export type ResponseApod = Static<typeof responseApod>;
