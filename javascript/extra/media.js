import { errorHandler } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.1/javascript/ui/errorHandler.js";
const constrains = {
    video: true,
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
    },
};
let media;
const setMedia = () => {
    if (media) {
        return;
    }
    media = navigator.mediaDevices.getUserMedia(constrains);
    media.catch((error) => {
        errorHandler(error);
        media = null;
    });
};
const releaseMedia = async () => {
    if (!media) {
        return;
    }
    const mediaData = await media;
    const tracks = mediaData.getTracks();
    tracks.forEach((track) => track.stop());
};
const changeMic = async (id) => {
    (await media).getAudioTracks()[0].stop();
    const nConstrains = {
        video: true,
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            deviceId: { exact: id },
        },
    };
    media = navigator.mediaDevices.getUserMedia(nConstrains);
    return media;
};
const muteAny = (track) => (track.enabled = !track.enabled);
const muteMic = async () => {
    const mediaObj = await media;
    mediaObj.getAudioTracks().forEach(muteAny);
};
const muteCam = async () => {
    const mediaObj = await media;
    mediaObj.getVideoTracks().forEach(muteAny);
};
export { media, setMedia, releaseMedia, muteCam, muteMic, changeMic };

//# sourceMappingURL=media.js.map
