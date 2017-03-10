if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const view = new View('body');
const network = new Network( bpHost(), 1000 );
const netStatusDisplay = document.querySelector('#connection');

// network.onConnecting( () => netStatusDisplay.innerHTML = 'Connecting...' );
// network.onError( err => {
//     netStatusDisplay.innerHTML =
//         `Could not connect: ` +
//         network.HOST +
//         '<br\>Trying to reconnect...';
// });
network.onConf( conf => {
    view.init(conf);
    netStatusDisplay.innerHTML = '';
});
network.onColor( view.update.bind(view) );
network.init();

addHostButton(() => {
    bpHost(true);
    location.reload();
});
