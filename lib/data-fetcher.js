const axios = require('axios');
const cheerio = require('cheerio');

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

module.exports = {
  launchesUrl,
  fetchLaunches,
};
