import { backend, session } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/index.js";
import { clearArray } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/modules/array.js";
import { othervideo } from "https://cdn.jsdelivr.net/gh/FlowerAce/OmClient-dist@1.2.2/javascript/ui/nodes/video.js";
const WEB = {
    config: {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
            {
                urls: "stun:stun.services.mozilla.com",
            },
        ],
    },
    constrains: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
    },
};
class PeerConnection extends RTCPeerConnection {
    constructor() {
        super(WEB.config);
        this.ontrack = (event) => {
            othervideo.srcObject = event.streams[0];
        };
        this.onicecandidate = async (event) => {
            if (this.iceGatheringState === "complete") {
                return;
            }
            session.rtc.icelocal.push(event.candidate);
            clearTimeout(session.rtc.wait);
            session.rtc.wait = setTimeout(() => {
                backend.sendIdentifiedPOST("icecandidate", { candidate: session.rtc.icelocal });
                clearArray(session.rtc.icelocal);
                session.rtc.wait = null;
            }, 50);
        };
        this.wait = 0;
    }
    addVideo(media) {
        const tracks = media.getTracks();
        for (const track of tracks) {
            this.addTrack(track, media);
        }
    }
    async offer(options) {
        const videoSession = await this.createOffer(options);
        await this.setLocalDescription(videoSession);
        backend.sendIdentifiedPOST("rtcpeerdescription", { desc: videoSession });
    }
    async answer(options) {
        const videoSession = await this.createAnswer(options);
        await this.setLocalDescription(videoSession);
        backend.sendIdentifiedPOST("rtcpeerdescription", { desc: videoSession });
    }
    async setRemote(description) {
        const answer = new RTCSessionDescription(description);
        await this.setRemoteDescription(answer);
    }
}
const eventHandlerRTC = async (event) => {
    const { rtc } = session;
    switch (event.name) {
        case "rtccall":
            rtc.call = true;
            pc.offer(WEB.constrains);
            break;
        case "rtcpeerdescription":
            pc.setRemote(event.data);
            rtc.peer = true;
            for (let i = 0; i < rtc.candidates.length; i++) {
                const signal = rtc.candidates[i];
                await pc.addIceCandidate(new RTCIceCandidate(signal));
            }
            rtc.candidates.splice(0, rtc.candidates.length);
            if (!rtc.call) {
                pc.answer(WEB.constrains);
            }
            break;
        case "icecandidate":
            if (!rtc.peer) {
                rtc.candidates.push(event.data);
                break;
            }
            pc.addIceCandidate(new RTCIceCandidate(event.data));
            break;
    }
};
const createPC = (media) => {
    pc = new PeerConnection();
    pc.addVideo(media);
    Object.freeze(pc);
};
const replaceTrack = async (mediaTrack) => {
    const senders = pc.getSenders();
    const sender = senders.find((s) => s.track.kind == mediaTrack.kind);
    sender.replaceTrack(mediaTrack);
};
const deletePC = () => {
    pc.close();
    delete pc.ontrack;
    delete pc.onicecandidate;
    pc = null;
};
let pc;
export { eventHandlerRTC, createPC, deletePC, replaceTrack };

//# sourceMappingURL=webrtc.js.map
