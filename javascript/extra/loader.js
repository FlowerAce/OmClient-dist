import * as cmd from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/commands/interface.js";
import { backend } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/index.js";
import { bindingHandler } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/keyboard/bindings.js";
import { keyboardHandler } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/keyboard/handler.js";
import { settingManager } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/storage/settings.js";
import * as chatNode from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/ui/chat/manager.js";
import * as disconnectNode from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/ui/nodes/disconnect.js";
import * as videoNode from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/ui/nodes/video.js";
import * as twiceSkip from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/ux/twiceSkip.js";
import { typingHanlder } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/ux/typing.js";
const loadAll = () => {
    addEventListeners();
    loadFromStroage();
    setObjProperties();
    backend.serverFinder();
};
const addEventListeners = () => {
    chatNode.typebox.addEventListener("input", typingHanlder);
    chatNode.sendbtn.addEventListener("click", chatNode.handleInput);
    disconnectNode.dcbtn.addEventListener("click", disconnectNode.dchandler);
    videoNode.othervideo.addEventListener("play", videoNode.playEvent);
    document.body.addEventListener("keydown", keyboardHandler);
    document.body.addEventListener("keydown", bindingHandler);
};
const loadFromStroage = () => {
    cmd.load();
    settingManager.load();
    twiceSkip.loadLocal();
};
const setObjProperties = () => {
    videoNode.selfvideo.muted = true;
};
export { loadAll };

//# sourceMappingURL=loader.js.map
