# Discord Bot with TypeScript

## Overview
This Discord bot is built using TypeScript and provides various commands to enhance your server experience. The bot includes commands such as /apod to fetch the Astronomy Picture of the Day, /wordle for a Wordle game, and /chess to fetch a chess puzzle from Lichess.


## Commands
* /apod - It gets the picture of the day from nasa's website
* /chess - It gets the daily puzzle from lichess
* /wordle - You can play a game of wordle with this command


## Prerequisites

Before running the bot, ensure you have the following installed:

* [Docker](https://hub.docker.com/)
* [Node.js (For development)](https://nodejs.org/en)


## Installation

1: Clone the repository
```bash
git clone https://github.com/me505/MultiPurposeDiscordBot.git
```

2: Change working directory
```bash
cd MultiPurposeDiscordBot
```

3: Build docker image
```bash
sudo docker build -t my-discord-bot .
```

4: Run the image
```bash
sudo docker run -it my-discord-bot:latest yarn start
```

## Configuration
Make sure to put all necesarry tokens in .env or else the bot will not work


## Support
For support, Please create a issue [here](https://github.com/me505/MultiPurposeDiscordBot/issues)

## Licesnse 
This project is licensed under [the GNU Affero General Public License]([https://opensource.org/license/mit/](https://www.gnu.org/licenses/agpl-3.0.en.html)https://www.gnu.org/licenses/agpl-3.0.en.html).



