import { releaseMedia } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.1/javascript/extra/media.js";
const flexTape = document.querySelector("#flex-tape");
const chat = document.querySelector(".chat");
const chatBox = document.querySelector("#chatbox");
const body = document.body;
const text = () => {
    flexTape.style.display = "none";
    body.appendChild(chatBox);
    releaseMedia();
};
const video = () => {
    flexTape.style.display = "";
    chat.appendChild(chatBox);
};
export { text, video };

//# sourceMappingURL=modes.js.map
