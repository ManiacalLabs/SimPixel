function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}

function bpHost() {
    const BP_HOST_DEFAULT = 'localhost:1337';
    const LS_ENABLED = typeof localStorage !== 'undefined';
    let bpHost = BP_HOST_DEFAULT;
    // Check if a server URL is specified in the query parameters
    const params = getQueryParams(document.location.search);
    if (params.host) {
        return params.host;
    }
    if (LS_ENABLED && localStorage.bpHost) {
        bpHost = localStorage.bpHost;
    }
    if (LS_ENABLED) {
        localStorage.bpHost = bpHost;
    }
    return 'ws://' + bpHost;
}
