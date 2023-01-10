import { settings } from "../storage/settings.js";
import { skip } from "./disconnect.js";
const idHistory = [];
const hashSet = new Set();
let browserHash = "";
const saveLocal = () => localStorage.setItem("idHistory", JSON.stringify(idHistory));
const loadLocal = () => {
    const parsed = JSON.parse(localStorage.getItem("idHistory"));
    if (parsed == null) {
        return;
    }
    idHistory.push(...parsed);
};
const getPairs = (id) => {
    const hashes = id.split(",");
    const firstPair = hashes[0] + hashes[1];
    const secondPair = hashes[2] + hashes[3];
    return [firstPair, secondPair];
};
const getRemoteHash = (id) => {
    const pairs = getPairs(id);
    return pairs[0] === browserHash ? pairs[1] : pairs[0];
};
const setBrowserHash = (id) => {
    const pairs = getPairs(id);
    for (const pair of pairs) {
        if (hashSet.has(pair)) {
            browserHash = pair;
            return;
        }
        hashSet.add(pair);
    }
};
const twiceSkipping = (id) => {
    if (!browserHash) {
        setBrowserHash(id);
        return;
    }
    const remoteHash = getRemoteHash(id);
    if (idHistory.includes(remoteHash) && settings.twiceskip) {
        skip();
        return true;
    }
    idHistory.push(remoteHash);
    saveLocal();
};
export { twiceSkipping, loadLocal };

//# sourceMappingURL=twiceSkip.js.map
