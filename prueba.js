var lcdi2c = require('lcdi2c');
var sensor = require('node-dht-sensor');
var gpio   = require('onoff').Gpio;

var lcd = new lcdi2c(1, 0x3f, 16, 2);

lcd.clear();

sensor.read(22, 23, function(err, temperature, humidity) {
	if (!err) {
		console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
			'humidity: ' + humidity.toFixed(1) + '%'
		);
		TEMPERATURA = temperature.toFixed(1) + '°C'
		lcd.println(TEMPERATURA, 2);
	}
});

