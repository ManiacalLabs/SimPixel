class Network {
    constructor(HOST, RECONNECT_TIMEOUT) {
        this.OP_CONF = 0b0000000000000000;
        this.OP_COLOR = 0b0000000000000001;
        this.HOST = HOST;

        this.connectingHandler = function() {};
        this.confHandler = function() {};
        this.colorHandler = function() {};
        this.errorHandler = function() {};
        this.initHandler = function() {};
    }
    init() {
        this.handleConnecting();
        try {
            this.ws = new ReconnectingWebSocket(this.HOST, null, {
                // debug: true,
                binaryType: 'arraybuffer',
                reconnectDecay: 1
            });

            this.ws.onopen = this.openHandler.bind(this);
            this.ws.onclose = this.closeHandler.bind(this);
            this.ws.onmessage = this.messageHandler.bind(this);
            this.ws.onerror = this.errorHandler.bind(this);
            this.initHandler();
        } catch (e) {
            this.initHandler(e);
            this.errorHandler(e);
        }
    }
    openHandler(fn) {
        console.log("WebSocket connection established and ready.");
    }
    closeHandler(fn) {

    }
    messageHandler(msg) {
        const opcode = new DataView(msg.data).getInt16(0);
        switch (opcode) {
            case this.OP_CONF:
                console.log('configuration received');
                this.handleConf(new Int16Array(msg.data, 2));
                break;
            case this.OP_COLOR:
                this.handleColor(new Uint8Array(msg.data, 2));
                break;
            default:
                console.warn(`unrecognized opcode: ${opcode}`);
        }
    }
    registerConfs(panel) {
        panel.add(this, 'HOST').name('Server').onFinishChange(this.changeHost.bind(this));
    }
    changeHost(host) {
        this.ws.url = host;
        this.ws.open();
    }
    onInit(fn) {
        this.initHandler = fn;
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
