if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const view = new View('#container');
const params = bpParams()
const network = new Network( params.host, 1000 );
const netStatusDisplay = document.querySelector('#connection');

// create a conf panel and allow each module to register its own configuration
// properties
const panel = new ConfPanel();
network.registerConfs(panel);
view.registerConfs(panel);

// Set up some event handlers to tie network activity to the UI

network.onConnecting( () => netStatusDisplay.innerHTML = 'Connecting...' );
network.onError( err => {
    netStatusDisplay.innerHTML = `Could not connect: ${network.HOST}<br\>Trying to reconnect...`;
});
network.onConf( conf => {
    view.init(conf);
    // Set point size and dark LEDs if in config parameters
    view.updateSizeDefault(params.size);
    view.updateDarkVisible(params.dark);
    netStatusDisplay.innerHTML = '';
});
network.onColor( view.update.bind(view) );

// kick off the websocket network connection

network.init();


// add a view source button to the panel

panel.add({ viewSource: () => window.open('https://github.com/ManiacalLabs/SimPixel') }, 'viewSource').name('View Source');
