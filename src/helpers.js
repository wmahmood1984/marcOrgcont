import { useState, useEffect } from "react";

export const useProgressiveImage = (src) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};
export const isBot = /google|bot|crawl|spider|slurp|baidu|bing|msn|teoma|yandex|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|biglotron|convera|gigablast|archive|webmon|httrack|grub|netresearchserver|speedy|fluffy|bibnum|findlink|panscient|IOI|ips-agent|yanga|Voyager|CyberPatrol|postrank|page2rss|linkdex|ezooms|heritrix|findthatfile|Aboundex|summify|ec2linkfinder|facebook|slack|instagram|pinterest|reddit|twitter|whatsapp|yeti|RetrevoPageAnalyzer|sogou|wotbox|ichiro|drupact|coccoc|integromedb|siteexplorer|proximic|changedetection|WeSEE|scrape|scaper|g00g1e|binlar|indexer|MegaIndex|ltx71|BUbiNG|Qwantify|lipperhey|y!j-asr|AddThis/i.test(
  navigator.userAgent
);
