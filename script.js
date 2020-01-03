// ==UserScript==
// @name         VK Away
// @namespace    https://github.com/uwufule/
// @version      1.1.1
// @description  Обход /away.php вконтача.
// @author       FuyukaiDesu
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

((function () {
  function observe(target, config, callback) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => callback(mutation, observer));
    });

    observer.observe(target, config);
    return observer;
  }

  function parseURIQuery(query) {
    return query.replace(/^\?/, '').split('&').reduce((list, item) => {
      const [k, v] = item.split('=');

      list[k] = v;
      return list;
    }, {});
  }

  document.body.querySelectorAll('a[href^="/away.php?to="]').forEach((a) => {
    a.href = decodeURIComponent(parseURIQuery(new URL(a.href).search).to);
  });

  observe(document.body, { childList: true, subtree: true }, (observer) => {

    const nodes = observer.target.getElementsByTagName('a');

    nodes.forEach((a) => {
      if (!a.href || !/^https?:\/\/vk\.com\/away\.php\?to=/.test(a.href)) {
        return;
      }

      a.href = decodeURIComponent(parseURIQuery(new URL(a.href).search).to);
    });
  });
})());
