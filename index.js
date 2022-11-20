/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import terminalSize from 'term-size';
import chalk from 'chalk';

const quotenumber = process.argv[2];
// console.log(quotenumber);

const color = ['red', 'green', 'blue', 'magenta', 'cyan', 'gray'];

async function getQuote(count) {
  const response = await axios.get(`https://goquotes-api.herokuapp.com/api/v1/random?count=${count}`);
  return response.data;
}

async function formatQuotes(count) {
  const terminalWidht = terminalSize().columns;
  // console.log(terminalWidht);
  const quotes = await getQuote(count);
  // console.log(quotes.quotes);
  quotes.quotes.forEach((quote) => {
    const len = quote.text.length;
    // console.log(len);
    if (terminalWidht < len) { console.log(chalk[color[Math.floor(Math.random() * color.length)]](`${quote.text} \n ${quote.author.padStart(terminalWidht / 2)}`)); } else { console.log(chalk[color[Math.floor(Math.random() * color.length)]](`${quote.text} \n ${quote.author.padStart(len / 2)}\n \n`)); }
  });
}
formatQuotes(quotenumber);
