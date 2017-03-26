function bpHost() {
    const BP_HOST_DEFAULT = 'localhost:1337';
    const LS_ENABLED = typeof localStorage !== 'undefined';
    let bpHost = BP_HOST_DEFAULT;
    if (LS_ENABLED && localStorage.bpHost) {
        bpHost = localStorage.bpHost;
    }
    if (LS_ENABLED) {
        localStorage.bpHost = bpHost;
    }
    return 'ws://' + bpHost;
}
