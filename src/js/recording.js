
class Network {
    constructor(HOST, RECONNECT_TIMEOUT) {
        this.OP_CONF = 0b0000000000000000;
        this.OP_COLOR = 0b0000000000000001;
        this.HOST = HOST;

        this.confHandler = function() {};
        this.colorHandler = function() {};
        this.errorHandler = function() {};

        this.recording = undefined;
        this.messageIndex = 0;
    }
    init() {
        this.handleConnecting();

        fetch('recordings/vis.json')
        .then(rsp => rsp.json())
        .then(json => {
            this.recording = json.map(this.base64ToArrayBuffer);
            this.openHandler();
        })
        .catch(this.errorHandler);
    }
    openHandler(fn) {
        console.log("Recording downloaded and ready.");
        this.nextMessageLoop();
    }
    closeHandler(fn) {

    }
    nextMessageLoop() {
        requestAnimationFrame(this.nextMessageLoop.bind(this));

        this.messageHandler(this.recording[this.messageIndex]);

        this.messageIndex += 1;
        this.messageIndex %= this.recording.length;

        // only let the configuration frame run once
        if (this.messageIndex === 0) {
            this.messageIndex = 1;
        }
    }
    messageHandler(data) {
        if(window.log) window.messageLog.push(_arrayBufferToBase64(data));
        const opcode = new DataView(data).getInt16(0);
        switch (opcode) {
            case this.OP_CONF:
                console.log('configuration received');
                this.handleConf(new Int16Array(data, 2));
                break;
            case this.OP_COLOR:
                this.handleColor(new Uint8Array(data, 2));
                break;
            default:
                console.warn(`unrecognized opcode: ${opcode}`);
        }
    }
    onConnecting(fn) {
        this.connectingHandler = fn;
    }
    onError(fn) {
        this.errorHandler = fn;
    }
    onConf(fn) {
        this.confHandler = fn;
    }
    onColor(fn) {
        this.colorHandler = fn;
    }
    handleConnecting() {
        this.connectingHandler();
    }
    handleError(err) {
        this.errorHandler(err);
    }
    handleConf(confMsg) {
        // const confMsg = mockConfMsg();
        this.confHandler(confMsg);
    }
    handleColor(colorMsg) {
        // const colorMsg = mockColorMsg();
        this.colorHandler(colorMsg);
    }
    // used to convert recordings from base64 strings back into arraybuffers
    base64ToArrayBuffer(base64) {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
}
