const http = require('http');
const https = require('https');

const port = process.env.PORT || 4567;

const fetchFrichti = () => new Promise((resolve, reject) => {
  const url = 'https://api-gateway.frichti.co/menu/epd-group/cart/896ba256-dadf-4a8b-9b85-b23ea799d08b';
  return https.get(url, (res) => {
    let body = '';
    res.on('data', function(d) {
      body += d;
    });
    res.on('end', function() {
      return resolve(JSON.parse(body));
    });
    res.on('error', reject);
  });
});

const getMenu = () => {
  const sections = [
    'entrees-antipasti',
    'entrees-soupes',
    'entrees-salades',
    'plats-pates',
    'plats-poisson',
    'plats-veggie',
    'plats-viande',
    'desserts-collaboration',
    'desserts-fruits',
    'desserts-patisseries',
    'desserts-yaourts',
  ];
  return fetchFrichti()
    .then((result) => result.collections)
    .then((result) => sections.reduce((res, section) => {
      if (!result[section]) return res;
      for (const item of result[section].items) {
        if (!item.product) continue;
        res.push(`${result[section].label} - ${item.product.title}`);
      }
      return res;
    }, []));
};

http.createServer(function (req, res) {
  const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
  };
  console.log('request');
  return getMenu().then((result) => {
    res.writeHead(200, headers);
    res.write(result.join('\n'));
    res.end();
  }).catch((err) => {
    console.error(err);
    res.writeHead(500, headers);
    res.write('shit happened');
    res.end();
  });
}).listen(port);

