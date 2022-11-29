import * as cmd from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/commands/interface.js";
import { sendMessage } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/extra/frontFunctions.js";
import { backend } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/index.js";
import { settingManager, settings } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/storage/settings.js";
import { addCommand } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/ui/chat/add.js";
import * as chatNode from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/ui/chat/manager.js";
import { disconnect } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.3/javascript/ux/disconnect.js";
const autoskip = () => (settings.autoskip = !settings.autoskip);
const stop = () => disconnect(false);
const server = () => backend.serverFinder();
const project = () => sendMessage("https://github.com/PWall2222/OmClient");
const setting = () => addCommand(JSON.stringify(settings, null, 4));
const clearCmd = () => cmd.clear();
const clearChat = () => chatNode.clear();
const save = () => settingManager.save();
export { autoskip, stop, server, project, clearCmd, clearChat, save, setting };

//# sourceMappingURL=simple.js.map
