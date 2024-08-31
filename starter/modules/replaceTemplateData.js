module.exports = function (temp, product) {
  let html = temp.replaceAll("{%PRODUCTNAME%}", `${product.productName}`);
  html = html.replaceAll("{%IMAGE%}", `${product.image}`);
  html = html.replaceAll("{%QUANTITY%}", `${product.quantity}`);
  html = html.replaceAll("{%PRICE%}", `${product.price}`);
  html = html.replaceAll("{%ID%}", `${product.id}`);
  html = html.replaceAll("{%NUTREINTS%}", `${product.nutrients}`);
  html = html.replaceAll("{%FROM%}", `${product.from}`);
  html = html.replaceAll("{%DECRIPTION%}", `${product.description}`);

  html = html.replaceAll(
    "{%NONORGANIC%}",
    `${product.organic ? "" : "not-organic"}`
  );

  return html;
};
