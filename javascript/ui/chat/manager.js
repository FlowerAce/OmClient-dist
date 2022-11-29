import { commandHandler } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/commands/handler.js";
import { sendMessage } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/extra/frontFunctions.js";
import { session } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/index.js";
import { clearAllElements, clearChilds } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/modules/dom.js";
import { settings } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/storage/settings.js";
import { setDC } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/ui/nodes/disconnect.js";
import { addChild } from "./add.js";
const logbox = document.querySelector("#logbox");
const logwrapper = document.querySelector("#logwrapper");
const typebox = document.querySelector("#chatmsg");
const sendbtn = document.querySelector("#sendbtn");
const clear = () => clearChilds("#logbox");
const scroll = () => logwrapper.scrollTo({ top: logwrapper.scrollHeight });
const autoClearChat = () => {
    if (!settings.autoclearchat) {
        return;
    }
    typebox.value = "";
};
const setTyping = (state) => {
    session.typing = state;
    if (!state) {
        clearAllElements(".typing");
        return;
    }
    addTyping();
};
const addTyping = () => {
    if (document.querySelector(".typing")) {
        return;
    }
    addChild({
        tag: "div",
        args: {
            className: "logitem typing",
        },
        child: {
            tag: "p",
            args: {
                className: "statuslog",
                innerText: "Stranger is typing...",
            },
        },
    });
};
const handleInput = () => {
    const chatContents = typebox.value;
    if (chatContents[0] === "/") {
        commandHandler(chatContents);
        typebox.value = "";
        return;
    }
    if (!session.connected || chatContents === "") {
        return;
    }
    sendMessage(typebox.value);
    typebox.value = "";
    setDC("stop");
};
export { logbox, typebox, sendbtn };
export { clear, scroll, setTyping, autoClearChat, handleInput };

//# sourceMappingURL=manager.js.map
