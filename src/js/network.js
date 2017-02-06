class Network {
    constructor(HOST) {
        this.OP_CONF  = 0b0000000000000000;
        this.OP_COLOR = 0b0000000000000001;
        this.HOST = HOST;

        this.confHandler = function () {};
        this.colorHandler = function () {};
        this.errorHandler = function () {};
    }
    init() {
        this.handleConnecting();
        try {
            this.ws = new WebSocket( this.HOST );
            this.ws.binaryType = 'arraybuffer';

            this.ws.onopen = this.openHandler.bind(this);
            this.ws.onmessage = this.messageHandler.bind(this);
            this.ws.onerror = this.errorHandler.bind(this);
        } catch (e) {
            this.errorHandler(e);
        }
    }
    openHandler(fn) {
        console.log("WebSocket connection established and ready.");
    }
    messageHandler(msg) {
        const opcode = new DataView(msg.data).getInt16(0);
        switch (opcode) {
            case this.OP_CONF:
                console.log('configuration received');
                this.handleConf(new Uint16Array(msg.data, 2));
                break;
            case this.OP_COLOR:
                this.handleColor(new Uint8Array(msg.data, 2));
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
}
