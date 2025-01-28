import 'dotenv/config';
import express from 'express';
import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { getRandomEmoji, DiscordRequest } from './utils.js';
import { getShuffledOptions, getResult } from './game.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// To keep track of our active games
const activeGames = {};


/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction id, type and data
  const { id, type, data } = req.body;
  const rollDice = (faces) => {
    let diceRes = Math.floor(Math.random() * faces) + 1;
    let answer = '';
    if (faces == 20) {
      if (diceRes == 1) {
        answer = 'ME PENSA ORA TU MUORE: ';
      } else if (diceRes == 20) {
        answer = 'UHHHH FATTO CRITICO: ';
      }
    }
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: `${answer}${diceRes}`,
      },
    };
  }
  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    switch (name) {

      case 'roll4':
        return res.send(rollDice(4));
      case 'roll6':
        return res.send(rollDice(6));
      case 'roll8':
        return res.send(rollDice(8));
      case 'roll10':
        return res.send(rollDice(10));
      case 'roll12':
        return res.send(rollDice(12));
      case 'roll20':
        return res.send(rollDice(20));
      case 'roll100':
        return res.send(rollDice(100));
      default:
        console.error(`unknown command: ${name}`);
        return res.status(400).json({ error: 'unknown command' });


    }

  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});