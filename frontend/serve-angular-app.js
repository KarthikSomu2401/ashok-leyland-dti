const angular = require('@angular/cli');
const run = angular.default;

const options = {
    cliArgs: [
        'serve',
    ]
};
run(options)
    .then(function () {
        console.log('then', arguments);
    })
    .catch(function () {
        console.log('catch', arguments);
    })
    .finally(function () {
        console.log('finally', arguments);
    });