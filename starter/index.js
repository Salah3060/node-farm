const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplateData = require('./modules/replaceTemplateData');

// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log(err);
//   fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./starter/txt/out.txt", "utf-8", (err, data3) => {});
//   });
// });

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const dataObj = JSON.parse(data);
    const cardsHtml = dataObj
      .map((ele) => replaceTemplateData(tempCard, ele))
      .join(' ');
    const html = tempOverview.replace('{%PRODUCTS%}', cardsHtml);
    res.end(html);
  }
  ///
  else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const dataObj = JSON.parse(data);
    const product = dataObj[query.id];
    const productHtml = replaceTemplateData(tempProduct, product);

    res.end(productHtml);
  }
  //
  else if (pathname === '/api') {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(data);
  }
  //
  else {
    res.writeHead(404, {
      'contnet-type': 'text/html',
      'my-own-head': 'Hello',
    });
    res.end('<h1>page Not Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => console.log('listen to reqs'));
