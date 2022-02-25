const amazon = require('./page-object/amazon');

(async () => {
  
  await amazon.initialize();
  let details = await amazon.getProductDetails('https://www.amazon.com/World-Ice-Fire-History-Westeros-ebook/dp/B00EGMGGVK/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1568120441&sr=1-2');

  
  
  
})();