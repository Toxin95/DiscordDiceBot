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

app.get('/callback', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  console.log('called callback');
  console.log(res);
  return res.status(200).json({});

});
/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction id, type and data
  const { id, type, data } = req.body;

  const rollDice = (faces, sum = 0) => {
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
        content: (sum) ? `${answer}${diceRes}+${sum} = ${diceRes + sum}` : `${answer}${diceRes}`,
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
    const { name, options } = data;
    const sumOption = options?.find(option => option.name === 'sum') ?? 0;
    const sum = sumOption ? sumOption.value : 0;
    switch (name) {

      case 'roll4':
        return res.send(rollDice(4, sum));
      case 'roll6':
        return res.send(rollDice(6, sum));
      case 'roll8':
        return res.send(rollDice(8, sum));
      case 'roll10':
        return res.send(rollDice(10, sum));
      case 'roll12':
        return res.send(rollDice(12, sum));
      case 'roll20':
        return res.send(rollDice(20, sum));
      case 'roll100':
        return res.send(rollDice(100, sum));
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