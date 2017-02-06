if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

const HOST = 'ws://localhost:1337';

const view = new View();
const network = new Network(HOST);

network.onConf( view.init.bind(view) );
network.onColor( view.update.bind(view) );
