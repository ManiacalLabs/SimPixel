class Network {
    constructor(HOST) {
        this.ws = new WebSocket( HOST );
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);

        this.confHandler = function () {};
        this.colorHandler = function () {};

        // setTimeout(() => this.handleConf(), 600);
        // setInterval(() => this.handleColor(), 1000);
    }
    onOpen() {
        console.log("WebSocket connection established and ready.");
    }
    onMessage(msg) {
        const opcode = new DataView(msg.data).getInt16(0);
        switch (opcode) {
            case OP_CONF:
                console.log('configuration received');
                this.handleConf(new Uint16Array(msg.data, 2));
                break;
            case OP_COLOR:
                this.handleColor(new Uint8Array(msg.data, 2));
                break;
            default:
                console.warn(`unrecognized opcode: ${opcode}`);
        }
    }
    onConf(fn) {
        this.confHandler = fn;
    }
    onColor(fn) {
        this.colorHandler = fn;
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
