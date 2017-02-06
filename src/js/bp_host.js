/**'
 * @param {boolean} alwaysAsk whether to ask the user for a host even if they have provided one during a previous visit
 */
function bpHost(alwaysAsk) {
    const BP_HOST_DEFAULT = 'localhost:1337';
    const LS_ENABLED = typeof localStorage !== 'undefined';
    let bpHost = BP_HOST_DEFAULT;
    if (LS_ENABLED && localStorage.bpHost) {
        bpHost = localStorage.bpHost;
    }
    if (alwaysAsk || (LS_ENABLED && !localStorage.bpHost)) {
        let requestedHost = prompt('Where is your BiblioPixel WebSocket server running?', bpHost);
        if (requestedHost) {
            bpHost = requestedHost;
        }
    }
    if (LS_ENABLED) {
        localStorage.bpHost = bpHost;
    }
    return 'ws://' + bpHost;
}
