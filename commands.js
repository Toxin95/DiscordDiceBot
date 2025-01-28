import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

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

// Simple test command
const ROLL4_COMMAND = {
  name: 'roll4',
  description: 'Rasta lancia dadino 4',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const ROLL6_COMMAND = {
  name: 'roll6',
  description: 'Rasta lancia dadino 6',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const ROLL8_COMMAND = {
  name: 'roll8',
  description: 'Rasta lancia dadino 8',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const ROLL10_COMMAND = {
  name: 'roll10',
  description: 'Rasta lancia dadino 10',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const ROLL12_COMMAND = {
  name: 'roll12',
  description: 'Rasta lancia dadino 12',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const ROLL20_COMMAND = {
  name: 'roll20',
  description: 'Rasta lancia dadino 20',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const ROLL100_COMMAND = {
  name: 'roll100',
  description: 'Rasta lancia dadino 100',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


const ALL_COMMANDS = [ ROLL4_COMMAND, ROLL6_COMMAND, ROLL8_COMMAND, ROLL10_COMMAND, ROLL12_COMMAND, ROLL20_COMMAND, ROLL100_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
