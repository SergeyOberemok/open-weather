var cityRequest = require('../requests/city-request');

module.exports = class CityController {

    index(req, res) {
        /* res.send({
            "data": [
                { "id": 1123, "name": "London", "country": "GB" },
                { "id": 27597, "name": "London", "country": "US" },
                { "id": 31715, "name": "London", "country": "CA" }
            ]
        }); */

        cityRequest.sendHttpRequest(res, req.originalUrl);
    }

    show(req, res) {
        // res.send({"data":{"id":1123,"name":"London","country":"GB", "cityId": "1234"}});

        cityRequest.sendHttpRequest(res, req.originalUrl);
    }

}