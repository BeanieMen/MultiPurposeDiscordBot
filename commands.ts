import { DiscordCommand } from "./src/types/type";

export const commands: DiscordCommand = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "chess",
    description: "Gives the daily puzzle given from lichess",
    options: [
      {
        name: "guess",
        description: "Guess the the answer in pgn notation",
        type: 3,
        required: false,
      },
    ],
  },
  {
    name: "apod",
    description: "Gets the current image of the data",
    options: [
      {
        name: "description",
        description: "Gives the description",
        type: 5,
        required: true,
      },
    ],
  },
  {
    name: "wordle",
    description: "start a wordle game",
    options: [
      {
        name: "word",
        description: "word",
        type: 3,
        required: false,
      },
      {
        name: "type",
        description: "Start or stop wordle",
        type: 3,
        required: false,
        choices: [
          {
            name: "Start",
            value: "start",
          },
          {
            name: "Stop",
            value: "stop",
          },
        ],
      },
    ],
  },
];
