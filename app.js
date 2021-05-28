const repl = require('repl');
const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express')

const {fetchLaunches} = require('./lib/data-fetcher');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

const replContext = repl.start('> ').context;
replContext.log = console.log;
replContext.$$ = r => replContext.__ = r;
replContext.$$$ = name => r => replContext[name] = r;

replContext.fetchLaunches = fetchLaunches;
replContext.axios = axios;
replContext.cheerio = cheerio;