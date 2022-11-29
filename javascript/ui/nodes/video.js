import { session } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/index.js";
import { clearAllElements, createChild } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/modules/dom.js";
const othervideo = document.querySelector("#othervideo");
const selfvideo = document.querySelector("#selfvideo");
const setVolume = (volume) => {
    othervideo.volume = volume / 100;
};
const playEvent = () => {
    session.video = true;
    clearAllElements(".spinner");
};
const addSpinner = () => {
    createChild("#videowrapper", { tag: "div", args: { className: "spinner" } });
};
const addMedia = (media) => {
    selfvideo.srcObject ??= media;
};
export { othervideo, selfvideo };
export { setVolume, playEvent, addSpinner, addMedia };

//# sourceMappingURL=video.js.map
