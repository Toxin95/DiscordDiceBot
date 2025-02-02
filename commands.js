import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

const COMMAND_TYPE = {
  SUB_COMMAND: 1,
  SUB_COMMAND_GROUP: 2,
  STRING: 3,
  INTEGER: 4, // Any integer between -2^53 and 2^53
  BOOLEAN: 5,
  USER: 6,
  CHANNEL: 7, // Includes all channel types + categories
  ROLE: 8,
  MENTIONABLE: 9, // Includes users and roles
  NUMBER: 10, // Any double between -2^53 and 2^53
  ATTACHMENT: 11
};

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}
const ALL_COMMANDS = [];

[4, 6, 8, 10, 12, 20, 100].forEach(element => {
  ALL_COMMANDS.push({
    name: 'roll' + element,
    description: 'Rasta lancia dadino ' + element,
    type: 1,
    "options": [
      {
        "name": "sum",
        "description": "Somma valore a risultato",
        "type": 4,
      },
      {
        "name": "n_dice",
        "description": "Numero dadi da tirare",
        "type": 4,
      }
    ],
    integration_types: [0, 1],
    contexts: [0, 1, 2],

  });
});

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
