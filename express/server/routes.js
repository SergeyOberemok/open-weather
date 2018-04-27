const path = require('path');
const CityController = require('../controllers/city-controller');
const WeatherController = require('../controllers/weather-controller');

module.exports = class Routes {

    constructor(app) {
        this.app = app;
        this.setUpRoutes();
    }

    setUpRoutes() {
        const cityController = new CityController();
        this.app.get('/api/cities', cityController.index);
        this.app.get('/api/cities/:id', cityController.show);
        const weatherController = new WeatherController();
        this.app.get('/api/weather', weatherController.index);
    }
};
