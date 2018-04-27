var http = require('http');

module.exports = {

	sendHttpRequest: function (res, path) {
		var data = '';
		var httpreq = http.request({
			host: 'api.openweathermap.org',
			port: '80',
			path: path,
			method: 'GET'
		}, function (response) {
			response.on('data', function (chunk) {
				data += chunk;
			});

			response.on('end', function () {
				res.send(data);
			});
		});
		httpreq.end();
	}

}