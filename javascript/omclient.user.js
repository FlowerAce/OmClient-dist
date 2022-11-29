// ==UserScript==
// @name         OmClient
// @version      1.0
// @author       PWall
// @include      https://omegle.com/*
// @include      https://www.omegle.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(async () => {
	document.documentElement.innerHTML = "<head><title>Omegle</title></head><body></body>";
	window.stop();
	const doc = await fetch("https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/index.html").then((response) => response.text());
	const item = document.createElement("iframe");
	item.srcdoc = doc;
	item.style = "position:fixed; inset:0; width:100%; height:100%; border:none;";
	document.body.appendChild(item);
	item.focus();
})();
