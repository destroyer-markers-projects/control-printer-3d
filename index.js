//Modulos requeridos
var lcdi2c = require('lcdi2c');
var dht    = require('dht-sensor');
var gpio   = require('onoff').Gpio;

// Funciones dsdfasdfa

function PrintLCD(HUMEDAD, TEMPERATURA) {
    var currentTime = new Date();
    lcd.clear();
    lcd.println(currentTime.toTimeString().substring(0, 8), 1);
    lcd.println("T: " + TEMPERATURA + "º / H: " + HUMEDAD + "%", 2);
    lcd.println("Hola como estas", 2);
}

//Conexiones Dispositivos
MODE_DHT = 11     // Modelo DHT (11 o 22)
GPIO_DHT = 23     // DHT 11
GPIO_PIR = 4
I2C_LCD  = "0x3f" // Dirección I2C LCD

// Declaramos las variables de los dispositivos
var lcd     = new lcdi2c(1, I2C_LCD, 20, 4);
var dht11   = dht.read(MODE_DHT, GPIO_DHT);
var pir     = new gpio(GPIO_PIR, 'in', 'both');

//Dispisitivo DHT11
var HUMEDAD     = dht11.humidity);
var TEMPERATURA = dht11.temperature);


//Dispositivo PIR (Si tiene movimiento)
pir.watch(function(err, value) {
    if (value == 1) {
        PrintLCD('Intruder alert');
    } else {
        PrintLCD('Intruder gone');
    }
});

