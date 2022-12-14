"use strict";
const clearBody = () => (document.body.style.display = "block");
const loadMode = () => {
    const mode = JSON.parse(localStorage.getItem("settings"))?.video;
    if (mode == null || mode) {
        return;
    }
    document.documentElement.setAttribute("data-mode", "text");
    document.addEventListener("DOMContentLoaded", text);
};
const text = () => {
    const flexTape = document.querySelector("#flex-tape");
    const chatBox = document.querySelector("#chatbox");
    flexTape.style.display = "none";
    document.body.appendChild(chatBox);
    clearBody();
};
loadMode();

//# sourceMappingURL=modeLoad.js.map
