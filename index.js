//Modulos requeridos
var lcdi2c = require('lcdi2c');
var dht    = require('dht-sensor');
var gpio   = require('onoff').Gpio;
var Request= require("request");
var rp     = require('request-promise');

//Declaramos las variables de los dispositivos
var lcd     = new lcdi2c(1, I2C_LCD, 20, 4);

//Conexiones Dispositivos
var MODE_DHT = 11     // Modelo DHT (11 o 22)
var GPIO_DHT = 23     // DHT 11
var GPIO_PIR = 4      // PIR
var I2C_LCD  = "0x3f" // Dirección I2C LCD
	
	
function WriteLCD(fichero,progreso,restante,temperatura){
    lcd.clear();
    lcd.println(fichero, 1);
    lcd.println(progreso, 2);
    lcd.println(restante, 3);
    lcd.println(temperatura, 4);
}

function WriteLCD_TEST(fichero,progreso,restante,temperatura){
	console.log(fichero)
    console.log(progreso)
    console.log(restante)
    console.log(temperatura)
}

function Movimiento() {

    //Declaramos variables
    var FICHERO  = ""
    var PROGRESO = ""
    var RESTANTE = ""
    
    var api = {
        method: 'GET',
        uri: "https://balkiest-ruff-7920.dataplicity.io/api/job?apikey=2D12C1ECED1E4314A28CD39D0AA6FAAA",
        json: true
    };
    
    rp(api)
        .then(function (parsedBody) {
            if (parsedBody.state == "Printing"){
                //Si la impresora esta funcionando encendemos el dispplay
                FICHERO = parsedBody.job.file.name
                PROGRESO = parsedBody.progress.completion
                PROGRESO = PROGRESO.toFixed(2);
                RESTANTE = (parsedBody.progress.printTimeLeft / 60) / 60
                RESTANTE = RESTANTE.toFixed(2);
                FICHERO  = "Archivo: " + FICHERO
                PROGRESO = "Progreso: " + PROGRESO + " %"
                RESTANTE = "Restante: " + RESTANTE + " horas"
            }else{
            	console.log ("paso")
                FICHERO  = "Archivo : SIN DATOS"
                PROGRESO = "Progreso: SIN DATOS"
                RESTANTE = "Restante: SIN DATOS"
            }
            //WriteLCD_TEST(FICHERO,PROGRESO,RESTANTE,"DDDDD")
            WriteLCD(FICHERO,PROGRESO,RESTANTE,"TEMPERATURA")

        })
        .catch(function (err) {
            console.log(err)
            FICHERO  = "Archivo : ERROR"
            PROGRESO = "Progreso: ERROR"
            RESTANTE = "Restante: ERROR"
            	console.log ("paso11")
            //WriteLCD_TEST(FICHERO,PROGRESO,RESTANTE,"DDDDD")
            WriteLCD(FICHERO,PROGRESO,RESTANTE,TEMPERATURA)
        });
  
}

setInterval(Movimiento, 1500);

