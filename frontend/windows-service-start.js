var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'AshokLeyland-Frontend',
    description: 'This is the frontend of Ashok Leyland Project.',
    script: require('path').join(__dirname, 'serve-angular-app.js'),
    nodeOptions: [
            '--harmony',
            '--max_old_space_size=4096'
        ]
        //, workingDirectory: '...'
        //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    svc.start();
});

svc.install();