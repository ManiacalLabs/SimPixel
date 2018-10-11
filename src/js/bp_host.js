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

function bpParams() {
    const BP_HOST_DEFAULT = 'ws://localhost:1337';
    const LS_ENABLED = typeof localStorage !== 'undefined';
    let bpHost = BP_HOST_DEFAULT;
    // Check if a server URL is specified in the query parameters
    const params = getQueryParams(document.location.search);
    if (params.host) {
        bpHost = params.host;
    } else if (LS_ENABLED && localStorage.bpHost) {
        bpHost = localStorage.bpHost;
    }
    if (LS_ENABLED) {
        localStorage.bpHost = bpHost;
    }
    let bpSize = 5;
    if (!isNaN(params.size)) {
        bpSize = parseInt(params.size);
    }
    return {
        host: bpHost,
        size: bpSize
    }
}
