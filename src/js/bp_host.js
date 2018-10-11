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
    const BP_SIZE_DEFAULT = 5;
    const BP_DARK_DEFAULT = true;
    const LS_ENABLED = typeof localStorage !== 'undefined';
    let bpHost = BP_HOST_DEFAULT;
    let bpSize = BP_SIZE_DEFAULT;
    let bpDark = BP_DARK_DEFAULT;
    // Check if a server URL is specified in the query parameters
    const params = getQueryParams(document.location.search);
    if (params.host) {
        bpHost = params.host;
    } else if (LS_ENABLED && localStorage.bpHost) {
        bpHost = localStorage.bpHost;
    }
    // Check if point size is specified in the query parameters
    if (!isNaN(params.size)) {
        bpSize = parseInt(params.size);
    } else if (LS_ENABLED && localStorage.bpSize) {
        bpSize = localStorage.bpSize;
    }
    if (params.dark === 'show') {
        bpDark = true;
    } else if (params.dark === 'hide') {
        bpDark = false;
    } else if (LS_ENABLED && localStorage.bpDark) {
        bpDark = localStorage.bpDark;
    }
    if (LS_ENABLED) {
        localStorage.bpHost = bpHost;
        localStorage.bpSize = bpSize;
        localStorage.bpDark = bpDark;
    }
    return {
        host: bpHost,
        size: bpSize,
        dark: bpDark
    }
}
