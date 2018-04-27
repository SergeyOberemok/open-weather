const path = require('path');
const express = require('express');
const Routes = require('./routes');

module.exports = class Server {

    constructor(port = 3000) {
        this.app = express();
        this.app.set('port', port);

        this.setUpIndexRoute();
        new Routes(this.app);

        this.setUpOnErrorResponses();
    }

    setUpIndexRoute() {
        const dist = path.resolve(__dirname, '../../dist');
        this.app.use('/', express.static(dist));
        this.app.get('/', (req, res) => res.sendFile(path.join(dist, 'index.html')));
    }

    setUpOnErrorResponses() {
        this.setUpOnNotFoundResponse();
        this.setUpOnServerErrorResponse();
    }

    setUpOnNotFoundResponse() {
        this.app.use((req, res) => res.type('text/plain').status(404).send('404'));
    }

    setUpOnServerErrorResponse() {
        this.app.use((req, res) => res.type('text/plain').status(500).send('500'));
    }

    start() {
        this.app.listen(this.app.get('port'), () => console.log(`Server started at http://localhost:${this.app.get('port')}`));
    }
};
