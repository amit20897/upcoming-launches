const repl = require('repl');
const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express')
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

const launchesUrl = 'https://everydayastronaut.com/upcoming-launches/';
async function fetchLaunches() {
  const html = await axios.get(launchesUrl);
  const $ = cheerio.load(html.data);

  const postsArea$ = $('div.cs-posts-area__main');

  const posts$ = postsArea$.children('article');

  const launches = [];

  posts$.each(i => {
    const p$ = posts$[i];
    try {
      launches.push(process());
    } catch (error) {
      launches.push(error);
    }

    function process() {
      const data = p$.children.find(a => a.name === 'div').children.find(a => a.name === 'div');
      if (!data) return;
      const a$ = data.children.find(a => a.name === 'a')
      const url = a$ && a$.attribs.href;

      const img$ = data.children.find(a => a.attribs && a.attribs.class.includes('cs-entry__thumbnail')).children[1].children.find(a => a.name === 'img');
      const imageUrl = img$ && img$.attribs.src;

      const content$ = data.children.find(a => a.attribs && a.attribs.class.includes('cs-entry__content'));
      const title = content$.children.find(a => a.name === 'h2').children.find(a => a.name === 'span').children[0].data;

      const meta$ = content$.children.find(a => a.attribs && a.attribs.class === 'cs-entry__post-meta');
      const utcDate = meta$.children.find(a => a.attribs && a.attribs.class.includes('article-launch-date')).attribs['data-launch-time'];

      return {url, imageUrl, title, utcDate};
    }
  });
  
  return launches;
}

replContext.launchesUrl = launchesUrl;
replContext.fetchLaunches = fetchLaunches;
replContext.axios = axios;
replContext.cheerio = cheerio;