const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const initial = "generic-tokenholders2?m=normal&a=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&s=335518244855784127435372355&sid=987bd2f2e095b52288e14c574f530354&p=1"
const urlNoPage =
  "https://bscscan.com/token/";

const fetchPage = async (url) => {
  try {
    // getDom
    const res = await fetch(url);
    const text = await res.text();
    const dom = new JSDOM(text);
    // GetHolders
    const tr_list = dom.window.document.querySelectorAll("tr");
    const tr_array = [...tr_list];
    const holders = tr_array.slice(1).reduce((addresses, tr) => {
      const address = tr.querySelector("a")?.innerHTML;
      if (address && tr.querySelector("span").childNodes.length === 1) {
        return [...addresses, address];
      }
      return addresses;
    }, []);
    const next = dom.window.document.querySelector('a[aria-label="Next"]').getAttribute('href').split("'")[1]
    return [holders, next];
  } catch (e) {
    console.error(e);
  }
};

const main = async () => {
  let allHolders = []
  let url = urlNoPage + initial
  for (let i = 1; i < 20; i++) {
    const [holders, next] = await fetchPage(url);
    url = urlNoPage + next
    allHolders = [...allHolders, ...holders]
  }
  console.dir(allHolders, {'maxArrayLength': null});
};

main();
